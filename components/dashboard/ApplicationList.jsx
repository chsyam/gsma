import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import styles from "./../../styles/dashboard/AddApplication.module.css"
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from "date-fns";
import dynamic from 'next/dynamic';
import loaderStyles from "./../../styles/Loading.module.css";

const Select = dynamic(() => import('react-select'), { ssr: false });

const headCells = [
    {
        id: 'slNo',
        label: 'SL.No.',
        align: 'center',
    },
    {
        id: 'applicationName',
        label: 'Application Name',
        align: 'left',
    },
    {
        id: 'applicationDescription',
        label: 'Application Description',
        align: 'left',
    },
    {
        id: 'cloudProvider',
        label: 'Cloud Provider',
        align: 'center',
    },
    {
        id: 'lastAnalysedOn',
        label: 'Last Analysed On',
        align: 'center',
    },
    {
        id: 'sustainabilityLevel',
        label: 'Sustainability Level',
        align: 'center',
    },
];

const tableCellStyle = {
    fontFamily: 'Montserrat',
    color: '#17202a',
    fontWeight: '500'
}

export default function ApplicationList({ projectsList }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const cloudOptions = [
        { value: 'AWS', label: 'AWS' },
        { value: 'Azure', label: 'Azure' },
        { value: 'GCP', label: 'GCP' },
    ]

    const maturityLevels = [
        { value: '1', label: 'Level 1' },
        { value: '2', label: 'Level 2' },
        { value: '3', label: 'Level 3' },
        { value: '4', label: 'Level 4' },
        { value: '5', label: 'Level 5' },
    ]

    const [selectedCloudProvider, setSelectedCloudProvider] = useState(null);
    const [selectedMaturityLevels, setSelectedMaturityLevels] = useState([]);
    const [applicationSearchTerm, setApplicationSearchTerm] = useState("");
    const [filteredRows, setFilterdRows] = useState([]);
    const [visibleRows, setVisibleRows] = useState([]);

    useEffect(() => {
        let temp = projectsList;
        if (applicationSearchTerm !== "") {
            temp = temp.filter((row) => {
                return row.application_name?.toLowerCase().includes(applicationSearchTerm.toLowerCase())
            })
        }
        if (selectedCloudProvider) {
            temp = temp.filter((row) => {
                return !selectedCloudProvider || (row.cloud_provider?.toLowerCase() === selectedCloudProvider?.value?.toLowerCase())
            })
        }
        if (selectedMaturityLevels.length !== 0) {
            temp = temp.filter((row) => {
                return !selectedMaturityLevels || selectedMaturityLevels.length === 0 || selectedMaturityLevels.map((level) => level.value).includes(row.sustainability_level)
            })
        }
        let sortedByTime = temp.sort((a, b) => {
            return new Date(b.last_analyzed_on) - new Date(a.last_analyzed_on)
        })
        setFilterdRows(sortedByTime)
    }, [applicationSearchTerm, selectedCloudProvider, selectedMaturityLevels])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    useEffect(() => {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setVisibleRows([...filteredRows].slice(startIndex, endIndex));
    }, [page, rowsPerPage, filteredRows]);

    const handleAddNewApp = () => {
        window.location.href = `${window.location.origin + window.location.pathname}/add`
    }

    const getFormattedDate = (date) => {
        return format(date, "dd/MM/yyyy hh:mm a");
    }

    const handleCloudProviderChange = (selectedOption) => {
        setSelectedCloudProvider(selectedOption);
    };

    const handleMaturityLevelChange = (selectedOption) => {
        setSelectedMaturityLevels(selectedOption);
    }

    const handleApplicationRoute = (appName, maturityLevel) => {
        if (['1', '2', '3', '4', '5'].includes(maturityLevel)) {
            if (appName) {
                window.location.href = `${window.location.origin + window.location.pathname}/application?projectName=${encodeURIComponent(appName)}`
            }
        } else {
            console.log("Invalid maturity level to proceed to application details");
        }
    }

    const getCloud = (cloudProvider) => {
        switch (cloudProvider?.toLowerCase()) {
            case "aws":
                return "AWS";
            case "azure":
                return "Azure";
            case "gcp":
                return "GCP";
            default:
                return "-";
        }
    }

    const getTextColor = (level) => {
        switch (level) {
            case 'Failed': return (
                <span className='text-[#F72B2B]'>{level}</span>
            );
            case "Analyzing": return (
                <div className="flex justify-center">
                    <span className={loaderStyles.dotLoader}></span>
                </div>
            );
            case "Pending": return (
                <div className={loaderStyles.dotLoader} />
            );
            default: return (
                <span className='text-[#000]'>{level}</span>
            );
        }
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className="flex justify-between items-center flex-nowrap">
                <div className="text-2xl font-semibold">
                    Sustainability Analysis Applications
                </div>
                <div
                    onClick={() => handleAddNewApp()}
                    className={styles.addApplication}>
                    Add Application <Plus />
                </div>
            </div>
            <div className="flex justify-between items-center gap-8 mt-4 px-4 flex-wrap">
                <div className="flex-grow max-w-[50%]">
                    <input
                        className="w-full py-2 px-4 text-sm rounded-sm border border-[#CED4DA]"
                        type="text"
                        placeholder="Type to search for Application..."
                        name="applicationSearchTerm"
                        id="applicationSearchTerm"
                        value={applicationSearchTerm}
                        onChange={(e) => setApplicationSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex justify-center gap-4 items-center">
                    <Select
                        placeholder="Cloud Provider"
                        isClearable
                        options={cloudOptions}
                        value={selectedCloudProvider}
                        onChange={handleCloudProviderChange}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                fontSize: '14px'
                            }),
                        }}
                    />
                    <Select
                        placeholder="Maturity Level"
                        options={maturityLevels}
                        isMulti
                        value={selectedMaturityLevels}
                        onChange={handleMaturityLevelChange}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                fontSize: '14px'
                            }),
                        }}
                    />
                </div>
            </div>
            <div className="px-4 mt-6 w-full">
                {
                    filteredRows.length === 0 ? (
                        <div className="text-center font-medium text-xl my-[50px] leading-10 select-none tracking-wide">
                            No applications found with these filters.
                            <br />
                            Try clearing filters.
                        </div>
                    ) : (
                        <Box sx={{ width: '100%' }}>
                            <Paper sx={{ width: '100%', mb: 2 }}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ background: '#549B79' }}>
                                                {
                                                    headCells.map((headCell, index) => (
                                                        <TableCell key={index} align={headCell.align}
                                                            sx={{ fontSize: '14px', color: '#FFF', letterSpacing: '0.05em' }}
                                                        >
                                                            {headCell.label}
                                                        </TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                visibleRows.map((row, index) => {
                                                    return (
                                                        <TableRow hover tabIndex={-1}
                                                            key={index}
                                                            sx={{ cursor: 'pointer', fontSize: '12px', fontFamily: 'Montserrat' }}
                                                            onClick={() => handleApplicationRoute(row.application_name, row?.sustainability_level)}
                                                        >
                                                            <TableCell align='center' sx={tableCellStyle}>
                                                                {row.sno || index + 1}
                                                            </TableCell>
                                                            <TableCell align='left' sx={tableCellStyle}>
                                                                {row.application_name ? row.application_name : "-"}
                                                            </TableCell>
                                                            <TableCell align='left' sx={tableCellStyle}>
                                                                {row.application_description ? row.application_description : '-'}
                                                            </TableCell>
                                                            <TableCell align='center' sx={tableCellStyle}>
                                                                {row.cloud_provider ? getCloud(row.cloud_provider) : "-"}
                                                            </TableCell>
                                                            <TableCell align='center' sx={{ ...tableCellStyle }}>
                                                                {row.last_analyzed_on ? getFormattedDate(row.last_analyzed_on) : "-"}
                                                            </TableCell>
                                                            <TableCell align='center' sx={{ ...tableCellStyle }}>
                                                                {
                                                                    getTextColor(row?.sustainability_level || "-")
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            }
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: 53 * emptyRows,
                                                    }}
                                                >
                                                    <TableCell colSpan={7} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={filteredRows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </Box>
                    )
                }
            </div>
        </div >
    );
}