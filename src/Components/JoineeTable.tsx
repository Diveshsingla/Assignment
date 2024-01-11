import { useStoredJoineeList } from "./JoineeContext.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import "../styles.css";

const theme = createTheme({
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: "20px",
        },
      },
    },
  },
});

const JoineeTable = () => {
  const {
    storedJoineeList,
    handleDeleteJoinee,
    handleEditJoinee,
    handleReorderJoinee,
  } = useStoredJoineeList();

  const handleDownloadCSV = (): void => {
    const csvData: string = `Name,Email,Hex Code\n${Object.values(
      storedJoineeList
    )
      .map(({ name, email, uuid }) => `${name},${email},${uuid}`)
      .join("\n")}`;

    // Create a Blob and trigger download
    const blob: Blob = new Blob([csvData], { type: "text/csv" });
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "JoineeList.csv";
    link.click();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="table-container">
        {storedJoineeList.length != 0 ? (
          storedJoineeList.length == 1 ? (
            <h1 className="table-heading">
              <text className="heading-part">1 </text>
              <text>Joinee</text>
            </h1>
          ) : (
            <h1 className="table-heading">
              <text className="heading-part">{storedJoineeList.length} </text>
              <text>Joinee's</text>
            </h1>
          )
        ) : null}
        <TableContainer component={Paper}>
          <Table>
            <TableBody sx={{ boxShadow: "none" }}>
              {storedJoineeList.map((Joinee, index: number) => (
                <TableRow
                  className={
                    (index + 1) % 2 == 0
                      ? "table-row-even table-row"
                      : "table-row-odd"
                  }
                  sx={{ height: "10%", display: "flex", width: "100%" }}
                  key={Joinee.uuid}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", `${index}`)
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) =>
                    handleReorderJoinee(
                      parseInt(e.dataTransfer.getData("text/plain")),
                      index
                    )
                  }
                >
                  <TableCell sx={{ width: "5%" }}>#{index + 1}</TableCell>
                  <TableCell sx={{ width: "25%" }}>{Joinee.name}</TableCell>
                  <TableCell sx={{ width: "20%" }}>
                    0x
                    {Joinee.uuid
                      .substring(0, 2)
                      .concat(".".repeat(3))
                      .concat(
                        Joinee.uuid.substring(
                          Joinee.uuid.length - 2,
                          Joinee.uuid.length
                        )
                      )}
                  </TableCell>
                  <TableCell sx={{ width: "30%" }}>
                    {Joinee.email
                      .substring(0, 3)
                      .concat(
                        "*"
                          .repeat(4)
                          .concat(
                            Joinee.email.substring(
                              Joinee.email.indexOf("@"),
                              Joinee.email.length
                            )
                          )
                      )}
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "20%",
                      padding: "10px",
                      alignItems: "end",
                      display: "flex",
                      alignContent: "end",
                    }}
                  >
                    <Button
                      sx={{ padding: "3px 0", minWidth: "25px" }}
                      className="table-button"
                      onClick={() =>
                        handleEditJoinee(
                          index,
                          prompt("New Name:", Joinee.name) || "",
                          prompt("New Email:", Joinee.email) || ""
                        )
                      }
                    >
                      ✎
                    </Button>
                    <Button
                      sx={{ padding: "3px 0", minWidth: "25px" }}
                      className="table-button"
                      onClick={() => handleDeleteJoinee(Joinee.name)}
                    >
                      🗑️
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {storedJoineeList.length === 0 ? null : (
          <div style={{ paddingTop: "25px" }}>
            <button className="form-button" onClick={handleDownloadCSV}>
              Download CSV
            </button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default JoineeTable;
