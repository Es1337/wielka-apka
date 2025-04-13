import "./Table.css"

interface TableProps {
    rowData: { name: string; results: string[] }[];
    colData: string[];
    addRowCallback: () => void;
}

const Table: React.FC<TableProps> = ({ rowData: rowData, colData: colData, addRowCallback: addRowCallback }) => {    
    return (
        <div className="table-container">
            
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {colData.map((col) => <th>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((row) => 
                        <tr>
                            <td>
                                {row.name}
                            </td>
                            {row.results.map((res) => <td className="actions">{res}</td>)}
                        </tr>
                    )}
                    <tr className="add-row">
                        <td onClick={addRowCallback} colSpan={colData.length + 1}><span className="add-row add"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;