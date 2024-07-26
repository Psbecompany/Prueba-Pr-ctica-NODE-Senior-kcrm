import { useState, useEffect } from "react";
import { fetchAllEmployees } from "../../lib/data";
import ResultsTable from "./ResultsTable";
import FormDialog from "./FormDialog/FormDialog";
import { toast } from "react-toastify";

export default function Employee() {
  const [data, setData] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const openNew = () => {
    setSelectedData(null);
    setProductDialog(true);
  };

  const handleEdit = (rowData) => {
    setProductDialog(true);
    setSelectedData(rowData);
  };
  const hideDialog = () => {
    setProductDialog(false);
    setSelectedData(null);
  };

  const getEmployees = async () => {
    try {
      const employees = await fetchAllEmployees();
      setData(employees);
    } catch (error) {
      toast.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <div className="card">
        <ResultsTable
          data={data}
          handleEdit={handleEdit}
          openNew={openNew}
          getEmployees={getEmployees}
        />
      </div>
      <FormDialog
        visible={productDialog}
        hideDialog={hideDialog}
        selectedData={selectedData}
        getEmployees={getEmployees}
      />
    </div>
  );
}
