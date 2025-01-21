import { useState, useEffect } from "react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Card } from "@/components/ui/card";
    import { Trash, Edit, Plus } from "lucide-react";
    import { toast } from "sonner";
    import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
    import { supabase } from "@/integrations/supabase/client";
    import { useNavigate } from "react-router-dom";
    
    interface Department {
      id: string;
      nome: string;
      descricao: string | null;
      data_criacao: string;
    }
    
    interface User {
      id: string;
      email: string;
    }
    
    const Departments = () => {
      const navigate = useNavigate();
      const queryClient = useQueryClient();
      const [user, setUser] = useState<User | null>(null);
      const [newDepartmentName, setNewDepartmentName] = useState("");
      const [editDepartmentId, setEditDepartmentId] = useState<string | null>(null);
      const [editDepartmentName, setEditDepartmentName] = useState("");
    
      // Verificar sessão do usuário
      useEffect(() => {
        const checkUser = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || ''
            });
          }
        };
        checkUser();
    
        // Listener para mudanças de autenticação
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || ''
            });
          } else {
            setUser(null);
          }
        });
    
        return () => {
          authListener.subscription.unsubscribe();
        };
      }, []);
    
      // Logout
      const handleLogout = async () => {
        try {
          await supabase.auth.signOut();
          toast.success("Logout realizado com sucesso!");
          navigate('/login');
        } catch (error) {
          console.error("Erro no logout:", error);
          toast.error("Não foi possível realizar o logout");
        }
      };
    
      const { data: departments = [], isLoading } = useQuery({
        queryKey: ['departments'],
        queryFn: async () => {
          const { data, error } = await supabase
            .from('departamentos')
            .select('*')
            .order('nome');
          
          if (error) {
            console.error('Error fetching departments:', error);
            toast.error("Erro ao carregar departamentos");
            throw error;
          }
          return data;
        },
        enabled: !!user // Só busca departamentos se usuário estiver logado
      });
    
      const createDepartment = useMutation({
        mutationFn: async (nome: string) => {
          // Verificar se usuário está autenticado
          if (!user) {
            toast.error("Você precisa estar logado para criar um departamento.");
            throw new Error("Usuário não autenticado");
          }
    
          try {
            const { data, error } = await supabase
              .from('departamentos')
              .insert([{ 
                nome, 
                usuario_id: user.id 
              }])
              .select()
              .single();
            
            if (error) {
              console.error('Detailed Supabase Error:', error);
              toast.error(`Erro ao criar departamento: ${error.message}`);
              throw error;
            }
            
            return data;
          } catch (error) {
            console.error('Erro completo:', error);
            toast.error("Não foi possível criar o departamento. Verifique suas permissões.");
            throw error;
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['departments'] });
          toast.success("Departamento adicionado com sucesso!");
          setNewDepartmentName("");
        },
        onError: (error: any) => {
          console.error('Department Creation Error:', error);
          toast.error(error.message || "Não foi possível criar o departamento");
        }
      });
    
      const updateDepartment = useMutation({
        mutationFn: async ({ id, nome }: { id: string; nome: string }) => {
          const { data, error } = await supabase
            .from('departamentos')
            .update({ nome })
            .eq('id', id)
            .select()
            .single();
          
          if (error) {
            console.error('Error updating department:', error);
            throw error;
          }
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['departments'] });
          toast.success("Departamento atualizado com sucesso!");
          setEditDepartmentId(null);
          setEditDepartmentName("");
        },
        onError: (error) => {
          console.error('Erro ao atualizar departamento:', error);
          toast.error("Erro ao atualizar departamento. Verifique se você está autenticado.");
        }
      });
    
      const deleteDepartment = useMutation({
        mutationFn: async (id: string) => {
          const { error } = await supabase
            .from('departamentos')
            .delete()
            .eq('id', id);
          
          if (error) {
            console.error('Error deleting department:', error);
            throw error;
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['departments'] });
          toast.success("Departamento excluído com sucesso!");
        },
        onError: (error) => {
          console.error('Erro ao excluir departamento:', error);
          toast.error("Erro ao excluir departamento. Verifique se você está autenticado.");
        }
      });
    
      const handleAddDepartment = () => {
        if (!newDepartmentName.trim()) {
          toast.error("Por favor, preencha o nome do departamento.");
          return;
        }
        createDepartment.mutate(newDepartmentName);
      };
    
      const handleEditDepartment = (department: Department) => {
        setEditDepartmentId(department.id);
        setEditDepartmentName(department.nome);
      };
    
      const handleUpdateDepartment = () => {
        if (!editDepartmentName.trim()) {
          toast.error("Por favor, preencha o nome do departamento.");
          return;
        }
        if (editDepartmentId) {
          updateDepartment.mutate({
            id: editDepartmentId,
            nome: editDepartmentName
          });
        }
      };
    
      const handleDeleteDepartment = (id: string) => {
        deleteDepartment.mutate(id);
      };
    
      // Se não estiver logado, mostrar tela de login
      if (!user) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <Card className="w-[350px] p-6">
              <h2 className="text-2xl font-bold mb-4">Você precisa estar logado para acessar esta página</h2>
              <Button onClick={() => navigate('/login')} className="w-full">
                Ir para a tela de login
              </Button>
            </Card>
          </div>
        );
      }
    
      return (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Departamentos</h1>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
    
          <Card className="mb-4 p-4">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (newDepartmentName.trim()) {
                  createDepartment.mutate(newDepartmentName);
                }
              }}
              className="flex gap-2"
            >
              <Input 
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                placeholder="Nome do departamento" 
                className="flex-grow"
              />
              <Button type="submit">
                <Plus className="mr-2" /> Adicionar
              </Button>
            </form>
          </Card>
    
          {isLoading ? (
            <p>Carregando departamentos...</p>
          ) : (
            <div className="grid gap-4">
              {departments.map((dept) => (
                <Card key={dept.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{dept.nome}</h3>
                    {dept.descricao && <p className="text-muted-foreground">{dept.descricao}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => {
                        setEditDepartmentId(dept.id);
                        setEditDepartmentName(dept.nome);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => {
                        handleDeleteDepartment(dept.id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
    
          {editDepartmentId && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Editar Departamento</h2>
              <div className="space-y-4">
                <Label htmlFor="editDepartmentName">Nome</Label>
                <Input
                  id="editDepartmentName"
                  placeholder="Nome do departamento"
                  value={editDepartmentName}
                  onChange={(e) => setEditDepartmentName(e.target.value)}
                />
                <Button
                  onClick={handleUpdateDepartment}
                  className="mt-4 bg-primary hover:bg-primary/90"
                  disabled={updateDepartment.isPending}
                >
                  {updateDepartment.isPending ? "Atualizando..." : "Atualizar Departamento"}
                </Button>
              </div>
            </Card>
          )}
        </div>
      );
    };
    
    export default Departments;
