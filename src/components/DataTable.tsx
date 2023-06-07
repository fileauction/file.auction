import gray from '@/colors/gray';
import Button from '@/components/Button';
import { ArrowBack, ArrowForward, HideSource } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Pagination as MuiPagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableContainerProps,
  TableHead,
  TableRow,
  paginationItemClasses,
  tableCellClasses,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useThrottleFn } from 'ahooks';
import React, { ElementType, Key, ReactNode, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

const Container = styled(TableContainer)<TableContainerProps & { component: ElementType }>(({ theme }) => ({
  borderRadius: '12px',
  border: `1px solid ${gray[200]}`,
}));

const Header = styled(TableHead)(({ theme }) => ({
  backgroundColor: gray[50],
}));

const Body = styled(TableBody)(({ theme }) => ({}));

const Cell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: '0.75rem',
    color: gray[600],
    padding: '13px 24px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.85rem',
    color: gray[900],
    padding: '13px 24px',
  },
}));

const Pagination = styled(MuiPagination)(({ theme }) => ({
  [`& .${paginationItemClasses.root}`]: {
    padding: '10px',
    fontWeight: 500,
    fontSize: '0.875rem',
    color: gray[600],
  },
  [`& .${paginationItemClasses.selected}`]: {
    color: gray[800],
    backgroundColor: gray[50],
  },
}));

export type ColumnsType<RecordType = unknown> = {
  title?: ReactNode;
  key: Key;
  align?: TableCellProps['align'];
  hide?: boolean;
  width?: number;
  render?: (value: any, record: RecordType, index: number) => ReactNode;
}[];

export type CommonTableProps<RecordType> = {
  data: RecordType[];
  dataKey?: Key;
  columns: ColumnsType<RecordType>;
  usePagination?: boolean;
  totalPage?: number;
  curPage?: number;
  total?: number;
  scroll?: boolean;
  loadingData?: boolean;
  skeletonLoading?: boolean;
  noRecordText?: ReactNode;
  onChangePage?: (newPage: number) => void;
};

export function calcPageCount(totalRecord: number, pageSize: number) {
  return Math.ceil(totalRecord / pageSize);
}

export function getTableData(page = 1, pageSize = 10, totalData = [] as any[]) {
  const { length } = totalData;
  const startIndex = pageSize * (page - 1);
  const endIndex = startIndex + pageSize;

  return length === 0 ? [] : totalData.slice(startIndex, endIndex);
}

export default function DataTable<RecordType>(props: CommonTableProps<RecordType>) {
  const {
    data,
    dataKey,
    totalPage,
    curPage,
    usePagination,
    columns,
    scroll,
    loadingData,
    skeletonLoading,
    noRecordText,
    onChangePage,
  } = props;

  const handleChangePage = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    onChangePage?.(newPage);
  };

  const { run } = useThrottleFn(
    (newPage: number) => {
      console.log(newPage);
      onChangePage?.(newPage);
    },
    { wait: 500 },
  );

  const tableEl = useRef<HTMLDivElement | null>(null);
  const [distanceBottom, setDistanceBottom] = useState(0);

  const hasMore = useMemo(() => {
    if (curPage !== undefined && totalPage !== undefined) {
      return curPage < totalPage;
    } else {
      return true;
    }
  }, [totalPage, curPage]);

  const scrollListener = useCallback(() => {
    if (!tableEl.current) {
      return () => {};
    }
    let bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
    // if (!distanceBottom) {
    setDistanceBottom(Math.round(bottom * 0.2));
    // }
    if (tableEl.current.scrollTop > bottom - distanceBottom && hasMore && !loadingData) {
      run((curPage || 0) + 1);
    }
  }, [hasMore, run, loadingData, distanceBottom, tableEl]);

  useLayoutEffect(() => {
    if (!tableEl.current) {
      return () => {};
    }
    const tableRef = tableEl.current;
    tableRef.addEventListener('scroll', scrollListener);
    return () => {
      tableRef.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener, tableEl]);

  return (
    <Container
      ref={tableEl}
      component="div"
      sx={{
        boxShadow: `0px 1px 3px ${alpha(gray[900], 0.1)}, 0px 1px 2px ${alpha(gray[900], 0.06)}`,
        maxHeight: scroll ? 450 : 'none',
      }}
    >
      <Table stickyHeader={scroll} sx={{ minWidth: 650 }}>
        <colgroup>
          {columns.map((c) => {
            return <col key={c.key} style={{ width: c.width ? `${c.width}%` : '' }} />;
          })}
        </colgroup>
        <Header>
          <TableRow>
            {columns
              .filter((col) => !col.hide)
              .map((col, index) => (
                <Cell key={col.key} align={index === 0 ? 'inherit' : col.align || 'inherit'}>
                  {col.title}
                </Cell>
              ))}
          </TableRow>
        </Header>
        <Body>
          {data.map((row, rowIndex) => {
            const pathArr = typeof dataKey === 'string' ? dataKey.split('.') : [];
            const rowKey =
              typeof dataKey === 'string'
                ? // @ts-ignore
                  pathArr.reduce((cur, key) => {
                    if (cur[key as keyof RecordType] === undefined) {
                      console.warn(`Key:${JSON.stringify(key)} not exist`);
                    }
                    return cur[key as keyof RecordType] as string;
                  }, row)
                : (row[dataKey as keyof RecordType] as string);
            return (
              <TableRow
                key={rowKey}
                sx={{
                  '&:last-child td, &:last-child th': {
                    borderBottom: usePagination ? '1px solid rgba(224, 224, 224, 1);' : 0,
                  },
                }}
              >
                {columns
                  .filter((col) => !col.hide)
                  .map((column) => {
                    return (
                      <Cell component="th" scope="row" key={column.key} align={column.align || 'inherit'}>
                        {column.render?.(row[column.key as keyof RecordType], row, rowIndex) ||
                          (row[column.key as keyof RecordType] as any)}
                      </Cell>
                    );
                  })}
              </TableRow>
            );
          })}
          {loadingData && skeletonLoading && (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': {
                  borderBottom: usePagination ? '1px solid rgba(224, 224, 224, 1);' : 0,
                },
              }}
            >
              {columns.map((column, index) => {
                return (
                  <Cell component="th" scope="row" key={column.key} align={column.align || 'inherit'}>
                    <Skeleton width="80%" />
                  </Cell>
                );
              })}
            </TableRow>
          )}
        </Body>
      </Table>
      {!loadingData && data.length === 0 && (
        <Box
          sx={{
            p: '16px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: gray[500],
          }}
        >
          {noRecordText ? (
            noRecordText
          ) : (
            <>
              <HideSource
                sx={{
                  fontSize: '1rem',
                }}
              />
              <Box
                sx={{
                  ml: '12px',
                  fontSize: '1rem',
                }}
              >
                No Records
              </Box>
            </>
          )}
        </Box>
      )}
      {loadingData && !skeletonLoading && (
        <Box
          sx={{
            p: '16px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid rgba(224, 224, 224, 1)',
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
      {usePagination && (
        <Box
          sx={{
            padding: '13px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<ArrowBack />}
            sx={{
              color: gray[700],
              visibility: curPage === 1 ? 'hidden' : 'visible',
            }}
            disabled={curPage === 1}
            onClick={(e) => handleChangePage(e, curPage ? curPage - 1 : 0)}
          >
            Previous
          </Button>
          <Pagination
            shape="rounded"
            count={totalPage}
            page={curPage}
            siblingCount={1}
            hideNextButton
            hidePrevButton
            onChange={handleChangePage}
          />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            endIcon={<ArrowForward />}
            sx={{
              color: gray[700],
              visibility: curPage === totalPage ? 'hidden' : 'visible',
            }}
            disabled={curPage === totalPage}
            onClick={(e) => handleChangePage(e, curPage ? curPage + 1 : 0)}
          >
            Next
          </Button>
        </Box>
      )}
    </Container>
  );
}
