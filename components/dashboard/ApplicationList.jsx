import React from "react";
import Select from 'react-select'
import { useRouter } from "next/router";
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

const rows = [
    {
        applicationId: 1,
        applicationName: 'Sample App',
        applicationDescription: 'Sample App',
        cloudProvider: 'AWS',
        lastVersionAnalysed: '0.0.1',
        lastAnalysedOn: new Date(),
        sustainabilityLevel: 'Low',
    },
    {
        applicationId: 2,
        applicationName: 'Sample App',
        applicationDescription: 'Sample App',
        cloudProvider: 'AWS',
        lastVersionAnalysed: '0.0.1',
        lastAnalysedOn: new Date(),
        sustainabilityLevel: 'Low'
    },
    {
        applicationId: 3,
        applicationName: 'Sample App',
        applicationDescription: 'Sample App',
        cloudProvider: 'AWS',
        lastVersionAnalysed: '0.0.1',
        lastAnalysedOn: new Date(),
        sustainabilityLevel: 'Low'
    },
    {
        applicationId: 4,
        applicationName: 'Sample App',
        applicationDescription: 'Sample App',
        cloudProvider: 'AWS',
        lastVersionAnalysed: '0.0.1',
        lastAnalysedOn: new Date(),
        sustainabilityLevel: 'Low'
    },
    {
        applicationId: 5,
        applicationName: 'Sample App',
        applicationDescription: 'Sample App',
        cloudProvider: 'Azure',
        lastVersionAnalysed: '0.0.1',
        lastAnalysedOn: new Date(),
        sustainabilityLevel: 'Low'
    },
    {
        applicationId: 6,
        applicationName: 'Sample App',
        applicationDescription: 'Sample App',
        cloudProvider: 'GCP',
        lastVersionAnalysed: '0.0.1',
        lastAnalysedOn: new Date(),
        sustainabilityLevel: 'Low'
    }
];

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
        id: 'lastVersionAnalysed',
        label: 'Last Version Analysed',
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

export default function ApplicationList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, rowsPerPage],
    );

    const router = useRouter();
    const handleAddNewApp = () => {
        router.push(`${router.pathname}/add`)
    }

    const cloudOptions = [
        { value: 'AWS', label: 'AWS' },
        { value: 'Azure', label: 'Azure' },
        { value: 'GCP', label: 'GCP' },
    ]

    const maturityLevels = [
        { value: 1, label: 'Level 1' },
        { value: 2, label: 'Level 2' },
        { value: 3, label: 'Level 3' },
        { value: 4, label: 'Level 4' },
        { value: 5, label: 'Level 5' },
    ]

    const getFormattedDate = (date) => {
        return format(date, "dd/MM/yyyy hh:mm a");
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
                    <input className="w-full py-2 px-4 text-sm rounded-sm border border-[#CED4DA]" type="text" placeholder="Type to search for Application..." />
                </div>
                <div className="flex justify-center gap-4 items-center">
                    <Select
                        placeholder="Cloud Provider"
                        options={cloudOptions}
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
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: '#549B79' }}>
                                        {
                                            headCells.map((headCell, index) => (
                                                <TableCell key={index} align={headCell.align}
                                                    sx={{ fontSize: '14px', color: '#000' }}
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
                                                    sx={{ cursor: 'pointer', fontSize: 14, }}
                                                >
                                                    <TableCell align='center' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        {row.applicationId}
                                                    </TableCell>
                                                    <TableCell align='left' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        {row.applicationName}
                                                    </TableCell>
                                                    <TableCell align='left' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        {row.applicationDescription}
                                                    </TableCell>
                                                    <TableCell align='center' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        {row.cloudProvider}
                                                    </TableCell>
                                                    <TableCell align='center' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        {row.lastVersionAnalysed}
                                                    </TableCell>
                                                    <TableCell align='center' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        {getFormattedDate(row.lastAnalysedOn)}
                                                    </TableCell>
                                                    <TableCell align='center' sx={{
                                                        color: '#17202a'
                                                    }}>
                                                        Level 1 <span className="font-semibold px-1 text-black">
                                                            ({row.sustainabilityLevel})
                                                        </span>
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
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </div>
        </div>
    );
}