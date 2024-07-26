export async function saveSolicitud(values) {
  console.log("🚀 ~ saveSolicitud ~ values:", values);
  const url = values.id
    ? `http://localhost:3000/solicitud/update` // Endpoint para actualizar
    : `http://localhost:3000/solicitud/crear`; // Endpoint para crear
  const method = values.id ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la solicitud");
    }

    const data = await response.json();
    return { message: data.message || "Operación exitosa", success: true };
  } catch (error) {
    return { message: error.message, success: false };
  }
}
export async function deleteSolicitud(id) {
  const url = `http://localhost:3000/solicitud/delete/${id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // Si la respuesta es 204, no hay contenido para analizar
    if (response.status === 204) {
      return { message: "Operación exitosa", success: true };
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la solicitud");
    }

    const data = await response.json();
    return { message: data.message || "Operación exitosa", success: true };
  } catch (error) {
    return { message: error.message, success: false };
  }
}
