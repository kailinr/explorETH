import React from "react";
import styles from "./Block.module.css";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Block() {
  const location = useLocation();
  const { Block, hash, parentHash, Timestamp, Transactions, nonce, TxCount } =
    JSON.parse(location.state);

  return (
    <div className={styles.block}>
      <h3 className={styles.header}>Block {Block} Details</h3>

      <div>
        <div style={{ height: 400, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <TableContainer component={Paper}>
                <Table
                  className={styles.blockTable}
                  sx={{ minWidth: 400 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Timestamp</TableCell>
                      <TableCell align="center">Hash</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      key={Block * Math.random()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{Timestamp}</TableCell>
                      <TableCell align="center">{hash}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Nonce</TableCell>
                      <TableCell align="center">ParentHash</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      key={Block * Math.random()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{parseInt(nonce)}</TableCell>
                      <TableCell align="center">{parentHash}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer
                className={styles.transactions_container}
                component={Paper}
              >
                <Table
                  sx={{ minWidth: 450 }}
                  overflow="hidden"
                  padding-top="2em"
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>{TxCount} Transactions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Transactions.map((tx, index) => (
                      <TableRow
                        key={index * Math.random()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{tx}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
