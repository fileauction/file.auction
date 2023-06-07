import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import Button from '../Button';
import DataTable, { ColumnsType } from '../DataTable';
import { filesize } from 'filesize';
import { shortAddress } from '@/utils/address';

export interface FileItem {
  type: string;
  name: string;
  cid: string;
  lastEditBy: string;
  lastEditAt: string;
  size: bigint;
}

export interface FileStatisticsProps {
  items: FileItem[];
  showHeader?: boolean;
}

export default function FileStatistics({ items, showHeader }: FileStatisticsProps) {
  const columns: ColumnsType<FileItem> = [
    {
      title: 'Name',
      key: 'name',
      render: (_, item) => {
        return <Typography>{item.name}</Typography>;
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
      title: 'Last Edit',
      key: 'lastEditAt',
      render: (_, item) => {
        return (
          <Typography>
            {item.lastEditAt} {item.lastEditBy}
          </Typography>
        );
      },
    },
    {
      title: 'Size',
      key: 'size',
      render: (size) => {
        const s = filesize(size);
        return <Typography>{s.toString()}</Typography>;
      },
    },
  ];

  return (
    <Card>
      {showHeader && <CardHeader title="Files" action={<Button>View All</Button>} />}
      <CardContent>
        <DataTable columns={columns} data={items} dataKey="cid" />
      </CardContent>
    </Card>
  );
}
