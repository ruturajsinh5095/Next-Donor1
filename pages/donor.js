import clientPromise from "../lib/mongodb";
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { RiRefund2Fill } from "@react-icons/all-files/ri/RiRefund2Fill";
import { AppShell } from '@saas-ui/app-shell';
import Image from 'next/image';
import Link from 'next/link';
import React from "react";
import { useRef, useEffect } from "react";
import { useRouter } from 'next/router';
import { Box, Button, Spacer, Badge, Menu, MenuList, MenuButton, MenuItem, IconButton, HStack } from '@chakra-ui/react';
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';
import { OverflowMenu } from '@saas-ui/react'
import { Page, PageBody, useDataGridFilter, FiltersProvider, FiltersAddButton, ActiveFiltersList, Toolbar, DataGrid,DataGridPagination  } from '@saas-ui/pro';
import LoadingBar from "react-top-loading-bar";

export default function Donor(users) {
  const router = useRouter();
  const gridRef = useRef();
  const ref = useRef(null);
  const [Searchvalue, setSearchvalue] = React.useState('');

  useEffect(() => {
    ref.current.continuousStart();
    ref.current.complete();
    
  },[]);

  const filters = [
    {
      id: 'Country',
      label: 'Country',
      type: 'enum',
      icon: <RiRefund2Fill />,
      items: [
        {
          id: 'Tuvalu',
          label: 'Tuvalu',
          value: 'Tuvalu',
          icon: <Badge boxSize="8px" borderRadius="full" bg="blue.400" />,
        },
        {
          id: 'Switzerland',
          label: 'Switzerland',
          value: 'Switzerland',
          icon: <Badge boxSize="8px" borderRadius="full" bg="green.400" />,
        },
        {
          id: 'United States',
          label: 'United States',
          value: 'United States',
          icon: <Badge boxSize="8px" borderRadius="full" bg="red.400" />,
        },
      ],
    },
  ];
  const columns  = [
    {
      id: 'Donor',
      accessor: 'Donor',
      Header: 'Donor',
      filterFn: useDataGridFilter('string'),
      size: 80,
    
    },
    {
      id: 'Email',
      accessor: 'Email',
      Header: 'Email',
      filterFn: useDataGridFilter('string'),
      size: 120,
      
    },
    {
      id: 'Phone',
      accessor: 'Phone',
      Header: 'Phone',
      filterFn: useDataGridFilter('string'),
      size: 80,
     
    },
    {
      id: 'Address',
      accessor: 'Address',
      Header: 'Address',
      filterFn: useDataGridFilter('string'),
      size: 90,
     
    },
    {
      id: 'Country',
      accessor: 'Country',
      Header: 'Country',
      size: 80,
      filterFn: useDataGridFilter('string'),
      meta: {
        href: ({ _id }) => `#donor/${_id}`,
      },
    },
    {
      id: 'Actions',
      accessor: 'Actions',
      Header: 'Actions',
      cell: (_id) => (
        <>
          <Box onClick={(e) => e.stopPropagation()}>
            <OverflowMenu size="xs">
            <MenuItem onClick={() => updateDonor(_id.cell.row.original._id)}>Edit</MenuItem>
              <MenuItem onClick={() => deleteDonor(_id.cell.row.original._id)}>Delete</MenuItem>
            </OverflowMenu>
          </Box>
        </>
      ),
      
    },
    
  ];


let onNextpage = (_id) => {
  ref.current.continuousStart();
  ref.current.complete();

  router.push({
    pathname: '/updatedonor',
    query: {queryid : _id.original._id}
 });
};

  let updateDonor = (_id) => {
    router.push({
      pathname: '/updatedonor',
      query: {queryid : _id}
    });
  };
  
  let deleteDonor = async(_id) =>{
    fetch('/api/donation',{
      method: "DELETE",
      body: JSON.stringify({
        id: _id,
      }),
    }),
    router.push('/donor');
    
  }

  const onFilter = React.useCallback((filters) => {
    gridRef.current.setColumnFilters(
      filters.map((filter) => {
        return {
          id: filter.id,
          value: {
            value: filter.value,
            operator: filter.operator || 'is',
          },
        }
      }) 
    )
  }, []);



  


  const data1 = [];
  let length1 = (users.users).length;
  for(let i=0; i< length1;i++){
      data1.push(users.users[i]);
  }
    return(
      <>
      <LoadingBar color="#2563eb" ref={ref} />
      <HStack height="100vh" width="100vw" justifyItems="stretch" alignItems="stretch">
      <AppShell
          variant="static"
          minH="100%"
          sidebar={
            <Sidebar>
              <SidebarToggleButton />
              <SidebarSection direction="row">
              <Image src="/images/favicon-96x96.png" height={30} width={30} alt=""/>
                <Spacer />
                <Menu>
                  <MenuButton as={IconButton} icon={ <FaUserCircle size={'2em'}/>} variant="ghost"/>
                  <MenuList>
                    <MenuItem>Home</MenuItem>
                  <Link href="/"> <MenuItem>Sign out</MenuItem></Link>
                  </MenuList>
                </Menu>
              </SidebarSection>
              <SidebarSection aria-label="Main">
                  <Link href='/dashboard'><NavItem icon={<FiHome />} >Dashboard</NavItem></Link>
                  <Link href='/donation'><NavItem icon={<BiDonateHeart />} >Donation</NavItem></Link>
                  <NavItem icon={<FiUser/>} isActive>Donor</NavItem>
              </SidebarSection>
            </Sidebar>
          }
        >
          <FiltersProvider filters={filters} onChange={onFilter} >
    
              <Page height="400px" contentWidth="full" position="sticky"
                  title="Donors"
                  width="80vw"
                  overflow="hidden"
                  toolbar={
                    <Toolbar variant="outline">
                      {/* <SearchInput placeholder="Search" value={Searchvalue}
                          
                          size="sm" 
                          width={"sm"}
                           /> */}
                      <FiltersAddButton  />
                      <Link href="/adddonor"><Button
                             backgroundColor={"#2563eb"} color={"white"} pointerEvents={"none"}
                          >Add Donor</Button></Link>
                    </Toolbar>
                  }
                >
                  <PageBody fullWidth>
                    <ActiveFiltersList/>
                  <Box position="sticky">
                  
                  <DataGrid
                    instanceRef={gridRef}
                    columns={columns}
                    data={data1}
                    isSortable
                    isSelectable
                    isHoverable
                    onRowClick={onNextpage}
                    initialState={{
                      pagination: {
                        pageSize: 15,
                      }
                    }}
                >
                  <DataGridPagination  />
                </DataGrid>
                  </Box>
                 
                  </PageBody>
              </Page>
          </FiltersProvider>
      </AppShell>
      </HStack>
    </>
    )
}
export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  let users = await db.collection("donors").find({}).toArray();
  users = JSON.parse(JSON.stringify(users));


  return {
    props: { users },
  };
}