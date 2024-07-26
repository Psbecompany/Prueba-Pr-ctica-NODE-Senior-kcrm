export const fetchAllEmployees = async () => {
  try {
    const response = await fetch("http://localhost:3000/empleado", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching empleados:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const fetchAllSolicitudes = async () => {
  try {
    const response = await fetch("http://localhost:3000/solicitud", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching solicitudes:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
