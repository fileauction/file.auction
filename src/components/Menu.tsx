import base from '@/colors/base';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListProps,
  MenuListProps,
  styled,
} from '@mui/material';
import { ReactNode, useState } from 'react';

export interface MenuItem {
  id: string;
  title: ReactNode;
  icon?: ReactNode;
  href?: string;
  items?: MenuItem[];
  badge?: ReactNode;
  onClickItem: (item: OnClickItemParams) => void;
}

export type OnClickItemParams = Omit<MenuItem, 'onClickItem'>;

export type MenuProps = MenuListProps & {
  items: MenuItem[];
  selectedId: string;
};

const MenuComponent = styled(List)<ListProps>(({ theme }) => ({
  padding: 0,
  '.MuiListItemButton-root': { padding: '8px 12px', marginBottom: '4px' },
  '.MuiListItemIcon-root': {
    color: base.black,
    height: '24px',
    width: '24px',
    minWidth: '24px',
    marginRight: '14px',
  },
  '.MuiSvgIcon-root': {
    color: base.black,
  },
  '.SubMenuItem': {
    paddingLeft: '50px',
    '& .MuiListItemText-root .MuiTypography-root': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      color: 'rgba(255, 255, 255, 0.75)',
    },
  },
  '.MuiListItemText-root .MuiTypography-root': {
    color: base.black,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
  },
  '.Mui-selected': {
    borderRadius: '6px',
  },
  '& .MuiListItemButton-root:hover': {
    borderRadius: '6px',
  },
}));

export default function Menu({ items, selectedId }: MenuProps) {
  return (
    <MenuComponent>
      {items.map((item) => {
        if (item.items) {
          return <SubMenu key={item.id} menu={item} selectedId={selectedId} />;
        } else {
          return (
            <ListItemButton
              key={item.id}
              selected={selectedId === item.id}
              onClick={() => {
                item.onClickItem(item);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.title}</ListItemText>
              <ListItemSecondaryAction>{item.badge}</ListItemSecondaryAction>
            </ListItemButton>
          );
        }
      })}
    </MenuComponent>
  );
}

function SubMenu({ menu, selectedId }: { menu: MenuItem; selectedId: string }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <ListItemButton
        key={menu.id}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemIcon>{menu.icon}</ListItemIcon>
        <ListItemText>{menu.title}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menu.items?.map((item) => {
            return (
              <ListItemButton
                key={item.id}
                selected={selectedId === item.id}
                className="SubMenuItem"
                onClick={() => {
                  item.onClickItem(item);
                }}
              >
                <ListItemText>{item.title}</ListItemText>
                <ListItemSecondaryAction>{item.badge}</ListItemSecondaryAction>
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
