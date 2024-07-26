import { useState, useEffect } from "react";
import { fetchAllSolicitudes } from "../../lib/data";
import ResultsTable from "./ResultsTable";
import FormDialog from "./FormDialog/FormDialog";

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

  const getSolicitude = async () => {
    try {
      const employees = await fetchAllSolicitudes();
      setData(employees);
    } catch (error) {
      console.success("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getSolicitude();
  }, []);

  return (
    <div>
      <div className="card">
        <ResultsTable
          data={data}
          handleEdit={handleEdit}
          openNew={openNew}
          getSolicitude={getSolicitude}
        />
      </div>
      <FormDialog
        visible={productDialog}
        hideDialog={hideDialog}
        selectedData={selectedData}
        getSolicitude={getSolicitude}
      />
    </div>
  );
}
