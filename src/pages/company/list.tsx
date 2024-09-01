import CustomAvatar from '@/components/custome-avatar';
import { Text } from '@/components/text';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { Company } from '@/graphql/schema.types';
import { CompaniesListQuery } from '@/graphql/types';
import { currencyNumber } from '@/utilities';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, EditButton, DeleteButton, FilterDropdown, List, useTable } from '@refinedev/antd';
import { getDefaultFilter, HttpError, useGo } from '@refinedev/core';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Input, Space, Table } from 'antd';
import React from 'react';

export const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();

  const { tableProps, filters } = useTable<
    GetFieldsFromList<CompaniesListQuery>,
    HttpError,
    GetFieldsFromList<CompaniesListQuery>
  >({
    resource: "companies",
    onSearch: (values) => [
      {
        field: 'name',
        operator: 'contains',
        value: values.name,
      },
    ],
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc',
        },
      ],
    },
    filters: {
      initial: [
        {
          field: 'name',
          operator: 'contains',
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });

  // Define column configurations explicitly
  const columns: any = [
    {
      title: 'Company Title',
      dataIndex: 'name',
      filterIcon: <SearchOutlined />,
      filterDropdown: (props: any) => (
        <FilterDropdown {...props}>
          <Input placeholder="Search Company" />
        </FilterDropdown>
      ),
      render: (value: any, record: Company) => (
        <Space>
          <CustomAvatar shape="square" name={record.name as string} src={record.avatarUrl as string} />
          <Text style={{ whiteSpace: 'nowrap' }}>{record.name as string}</Text>
        </Space>
      ),
    },
    {
      title: 'Open Deals Amount',
      dataIndex: 'totalRevenue',
      render: (value: any, company: Company) => (
        <Text>
          {currencyNumber(company?.dealsAggregate?.[0]?.sum?.value || 0)}
        </Text>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      fixed: 'right',
      render: (value: any) => (
        <Space>
          <EditButton hideText size="small" recordItemId={value as string} />
          <DeleteButton hideText size="small" recordItemId={value as string} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: "companies",
                  action: "create",
                },
                options: {
                  keepQuery: true,
                },
                type: "replace",
              });
            }}
          />
        )}
      >
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
          }}
          rowKey="id"
          columns={columns}
        />
      {children}
      </List>
    </div>
  );
};
