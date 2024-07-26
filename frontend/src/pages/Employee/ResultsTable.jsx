import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import useAuth from "../../hooks/useAuth";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { deleteEmpleado } from "../../services/employee";
import { toast } from "react-toastify";

const ResultsTable = ({ data, handleEdit, openNew, getEmployees }) => {
  const { user } = useAuth();

  const [globalFilter, setGlobalFilter] = useState("");

  const dt = useRef(null);

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        {user.roles.includes("administrador") && (
          <>
            <Button
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              onClick={() => handleEdit(rowData)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              className="mr-2"
              severity="danger"
              onClick={() => confirm(rowData)}
            />
          </>
        )}
      </>
    );
  };

  const accept = async (id) => {
    const result = await deleteEmpleado(id);

    if (result.success) {
      toast.success("Empleado eliminado correctamente");
      getEmployees();
    } else {
      console.error("Error al eliminar el empleado:", result.message);
      toast.error("Error al eliminar el empleado");
    }
  };

  const reject = () => {};

  const confirm = (rowData) => {
    confirmDialog({
      message: "¿Estas seguro de eliminar este registro?",
      header: "Eliminar",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => accept(rowData.id),
      reject,
    });
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <Button
        label="Nuevo"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
      <h4 className="m-0">Administrar empleados</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </IconField>
    </div>
  );

  return (
    <>
      <ConfirmDialog />

      <DataTable
        ref={dt}
        value={data}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} del {last} al {totalRecords} usuarios"
        globalFilter={globalFilter}
        header={header}
      >
        <Column field="id" header="ID" sortable></Column>
        <Column field="nombre" header="Nombre" sortable />
        <Column field="salario" header="Salario" sortable />
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ maxWidth: "8rem" }}
        />
      </DataTable>
    </>
  );
};

export default ResultsTable;
