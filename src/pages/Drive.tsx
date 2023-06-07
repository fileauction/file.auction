import PageHeader from '@/components/PageHeader';
import FileStatistics from '@/components/dashborad/FileStatistics';
import { FILE_STATISTICS_ITEMS } from '@/utils/mockData';
import { Breadcrumbs, Link, Paper, Stack } from '@mui/material';

export default function Drive() {
  return (
    <Paper>
      <Breadcrumbs sx={{ padding: '16px' }}>
        <Link underline="hover" color="inherit">
          PermaBox
        </Link>
        <Link underline="hover" color="inherit">
          New Folder
        </Link>
      </Breadcrumbs>
      <FileStatistics items={FILE_STATISTICS_ITEMS} />
    </Paper>
  );
}
