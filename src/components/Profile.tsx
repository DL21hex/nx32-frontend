import { Component } from "solid-js";

interface ProfileData {
  name: string;
  role: string;
  avatar: string;
  email: string;
  department: string;
  location: string;
  status: "Active" | "Away" | "Offline";
}

const Profile: Component = () => {
  // Datos estáticos para visualización
  const user: ProfileData = {
    name: "Carlos Rodríguez",
    role: "Senior Frontend Developer",
    avatar: "/assets/images/default_avatar.png",
    email: "carlos.rodriguez@company.com",
    department: "Ingeniería de Producto",
    location: "Madrid, España",
    status: "Active"
  };

  return (
    <div class="w-full rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      {/* Cover Background */}
      <div class="h-32 w-full bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border"></div>

      <div class="px-6 pb-6">
        <div class="flex flex-col md:flex-row items-start md:items-end -mt-12 gap-4">
          {/* Avatar Container */}
          <div class="relative">
            <div class="h-24 w-24 rounded-full border-4 border-card bg-muted overflow-hidden shadow-sm">
              <img
                src={user.avatar}
                alt={`Avatar de ${user.name}`}
                class="h-full w-full object-cover"
              />
            </div>
            {/* Status Indicator */}
            <div
              class="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-card bg-green-500"
              title={user.status}
            ></div>
          </div>

          {/* User Info */}
          <div class="flex-1 pt-2 md:pt-0 md:mb-2">
            <h2 class="text-2xl font-bold tracking-tight text-foreground">{user.name}</h2>
            <p class="text-sm text-muted-foreground">{user.role}</p>
          </div>

          {/* Actions */}
          <div class="flex gap-2 mt-4 md:mt-0 md:mb-2">
            <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              Mensaje
            </button>
            <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border pt-6">
          <div class="flex flex-col space-y-1">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</span>
            <span class="text-sm font-medium">{user.email}</span>
          </div>
          <div class="flex flex-col space-y-1">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Departamento</span>
            <span class="text-sm font-medium">{user.department}</span>
          </div>
          <div class="flex flex-col space-y-1">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Ubicación</span>
            <span class="text-sm font-medium">{user.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
