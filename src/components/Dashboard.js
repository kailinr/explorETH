import styles from "../assets/Dashboard.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEthers } from "../hooks/useEthers";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [rows, setRows] = useState([]);

  const { blockData } = useEthers();

  useEffect(() => {
    function newBlock() {
      if (blockData.Block) {
        setRows((rows) => [...rows, { ...blockData }]);
      }
    }
    newBlock();
    return () => {};
  }, [blockData]);

  return (
    <div className={styles.dashboard}>
      <h2>Ethereum Blocks</h2>
      <div style={{ height: 400, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell> Blocks</TableCell>
                    <TableCell align="center">Timestamp</TableCell>
                    <TableCell align="center">TxCount</TableCell>
                    <TableCell align="center">Gas Used</TableCell>
                    <TableCell align="center">Gas Limit</TableCell>
                    <TableCell align="center">Base Fee (gwei)</TableCell>
                    <TableCell align="center">Difficulty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.Block * Math.random()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link
                          to={{
                            pathname: `/block/${row.Block}`,
                            state: `${JSON.stringify(row)}`,
                          }}
                        >
                          {row.Block}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{row.Timestamp}</TableCell>
                      <TableCell align="center">{row.TxCount}</TableCell>
                      <TableCell align="center">{row.Gas_Used}</TableCell>
                      <TableCell align="center">{row.Gas_Limit}</TableCell>
                      <TableCell align="center">{row.Base_Fee}</TableCell>
                      <TableCell align="center">{row.Difficulty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
