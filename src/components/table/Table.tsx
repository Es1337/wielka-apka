import "./Table.css"

interface TableProps {
    rowData: { name: string; results: string[] }[];
    colData: string[];
}

const Table: React.FC<TableProps> = ({ rowData: rowData, colData: colData }) => {

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
                        <td colSpan={colData.length + 1}><span className="add-row add"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;