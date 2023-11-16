'use client';

import React from 'react';

import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import Image from 'next/image';

import RightArrowIcon from '../../public/icons/RightArrow.svg';
import TableTabs from './tableTabs';

const DataTable = () => {
  return (
    <div className="max-w-full mx-10">
      <div className="flex min-h-full justify-between">
        <h2 className="text-xl font-semibold">Transaction history</h2>
        <Link
          href="/"
          className="flex gap-2 items-center"
        >
          View All
          <Image
            src={RightArrowIcon}
            alt="right arrow"
            width={5}
            height={9}
          />
        </Link>
      </div>
      <TableTabs />
      {/* <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
            <Table.Cell>zahra@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
            <Table.Cell>jasper@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root> */}
    </div>
  );
};

export default DataTable;
