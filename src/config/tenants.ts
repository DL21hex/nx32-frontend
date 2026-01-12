export const TENANTS: Record<string, { company_name: string; project_name: string; primaryColor: string; lightColor: string; logoWidth: string }> = {
	"agrovid-xccui.crearcolombia.com": {
		company_name: "Agrovid",
		project_name: 'agrovid',
		primaryColor: "#5FA27A",
		lightColor: "#E8F4EF",
		logoWidth: "64px",
	},
	"maradentro-xccui.crearcolombia.com": {
		company_name: "Mar Adentro",
		project_name: "maradentro",
		primaryColor: "#0E71B9",
		lightColor: "#E4F0FA",
		logoWidth: "128px",
	},
	"tecbaco-xccui.crearcolombia.com": {
		company_name: "Tecbaco",
		project_name: "tecbaco",
		primaryColor: "#C03321",
		lightColor: "#F7E7E5",
		logoWidth: "128px",
	},
};

export const DEFAULT_TENANT = {
	company_name: "Crear Colombia",
	project_name: "xcc",
	primaryColor: "#219ebc",
	lightColor: "#E3F6FB",
	logoWidth: "96px",
};