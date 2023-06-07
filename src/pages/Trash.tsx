import DataTable, { ColumnsType } from '@/components/DataTable';
import { shortAddress } from '@/utils/address';
import { Paper, Stack, Typography } from '@mui/material';

export interface DeleteFileItem {
  cid: string;
  name: string;
  time: string;
}

export default function Trash() {
  const columns: ColumnsType<DeleteFileItem> = [
    {
      title: 'Name',
      key: 'name',
      render: (name) => {
        return <Typography>{name}</Typography>;
      },
    },
    {
      title: 'CID',
      key: 'cid',
      render: (cid) => {
        return shortAddress(cid);
      },
    },
    {
      title: 'Deleted',
      key: 'time',
      render: (time) => {
        return <Typography>{time}</Typography>;
      },
    },
  ];
  return (
    <Paper sx={{ padding: '36px 16px' }}>
      <Stack spacing={1}>
        <Typography variant="h4">Deleted Files</Typography>
        <Typography>You can restore any file deleted in the last 30 days.</Typography>
        <DataTable
          columns={columns}
          data={[
            {
              name: 'new file.txt',
              cid: 'Qmaxvdfacv4qkcnvigpqp34nxpxv13dgy',
              time: '1 hr ago',
            },
            {
              name: 'my design.pdf',
              cid: 'Qmaxvdfacv4qkcnvigpqp34nxpxv13dgg',
              time: '1 day ago',
            },
          ]}
          dataKey="cid"
        />
      </Stack>
    </Paper>
  );
}
