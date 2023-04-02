import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

export default function CustomPagination({ pages, onChange }) {
    const [page, setPage] = useState(1);
    const handleChange = (_, value) => {
        setPage(value);
        onChange(value)
    };
    return <Pagination sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }} count={pages} page={page} onChange={handleChange} />
}
