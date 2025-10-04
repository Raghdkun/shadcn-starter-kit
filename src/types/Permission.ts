export type PermissionName = 
  | 'view users' | 'create users' | 'edit users' | 'delete users'
  | 'view roles' | 'create roles' | 'edit roles' | 'delete roles'  
  | 'view permissions'
  | 'view projects' | 'create projects' | 'edit projects' | 'delete projects'
  | 'view sections' | 'create sections' | 'edit sections' | 'delete sections'
  | 'view tasks' | 'create tasks' | 'edit tasks' | 'delete tasks'
  | 'view subtasks' | 'create subtasks' | 'edit subtasks' | 'delete subtasks'
  | 'view help requests' | 'create help requests' | 'edit help requests' | 'delete help requests'
  | 'view tickets' | 'edit tickets' | 'delete tickets'
  | 'view rating configs' | 'create rating configs' | 'edit rating configs' | 'delete rating configs'
  | 'create task ratings' | 'edit task ratings'
  | 'create stakeholder ratings' | 'edit stakeholder ratings';

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}