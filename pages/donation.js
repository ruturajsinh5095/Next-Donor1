import clientPromise from "../lib/mongodb";
import React from "react";
import { Badge, Spacer, Box, Button, HStack, IconButton, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { RiRefund2Fill } from "@react-icons/all-files/ri/RiRefund2Fill";
import { FiCircle } from "@react-icons/all-files/fi/FiCircle"
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { AppShell } from '@saas-ui/app-shell';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';
import { OverflowMenu } from '@saas-ui/react';
import { Page, PageBody, useDataGridFilter, FiltersProvider, FiltersAddButton, ActiveFiltersList, Toolbar, DataGrid, DataGridPagination } from "@saas-ui/pro";
import LoadingBar from "react-top-loading-bar";

export default function Donation(users) {
  const router = useRouter();
  const gridRef = useRef();
  const ref = useRef(null);
  const [donationid, setId] = useState("");


  useEffect(() => {
    ref.current.continuousStart();
    ref.current.complete();
    
  },[]);
  
   const filters = [
      {
        id: 'Type',
        label: 'Type',
        type: 'enum',
        icon: <FiCircle />,
        items: [
          {
            id: 'Cash',
            label: 'Cash',
            value: 'Cash',
            icon: <Badge boxSize="8px" borderRadius="full" bg="blue.400" />,
          },
          {
            id: 'CreditCard',
            label: 'CreditCard',
            value: 'CreditCard',
            icon: <Badge boxSize="8px" borderRadius="full" bg="green.400" />,
          },
          {
            id: 'Payoneer',
            label: 'Payoneer',
            value: 'Payoneer',
            icon: <Badge boxSize="8px" borderRadius="full" bg="red.400" />,
          },
        ],
      },
      {
        id: 'Fund',
        label: 'Fund',
        type: 'enum',
        icon: <RiRefund2Fill />,
        items: [
          {
            id: 'General Fund',
            label: 'General Fund',
            value: 'General Fund',
            icon: <Badge boxSize="8px" borderRadius="full" bg="blue.400" />,
          },
          {
            id: 'Covid Relif Fund',
            label: 'Covid Relif Fund',
            value: 'Covid Relif Fund',
            icon:  <Badge boxSize="8px" borderRadius="full" bg="green.400" />,
          },
        ],
      },
    ];

   const columns  = [
          {
            id: 'Donor',
            accessorKey: 'Donor',
            Header: 'Donor',
            filterFn: useDataGridFilter('string'),
            size: 90,
           
          },
          {
            id: 'Amount',
            accessorKey: 'Amount',
            Header: 'Amount',
            filterFn: useDataGridFilter('string'),
            size: 70,
           
          },
          {
            id: 'Type',
            accessorKey: 'Type',
            Header: 'Type',
            filterFn: useDataGridFilter('string'),
            size: 90,
           
          },
          {
            id: 'Fund',
            accessorKey: 'Fund',
            Header: 'Fund',
            filterFn: useDataGridFilter('string'),
            size: 90,
            
          },
          {
            id: 'Date',
            accessorKey: 'Date',
            Header: 'Date',
            size: 90,
            filterFn: useDataGridFilter('date'),
            meta: {
              href: ({ _id }) => `#donation/${_id}`,
             },
            
          },
          {
            id: 'Actions',
            Header: 'Actions',
            enableGlobalFilter: false,
            cell: (_id) => (
              <>
                <Box onClick={(e) => e.stopPropagation()}>
                  <OverflowMenu size="xs">
                  <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete </MenuItem>
                  </OverflowMenu>
                </Box>
              </>
            ),
            
          },
    ];

    const data1 = [];
    console.log(users.users);
    let length1 = (users.users).length;
    for(let i=0; i< length1;i++){
      data1.push(users.users[i]);
    }

    console.log(data1);

  

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
      

    return(
      <>
      <LoadingBar color="#2563eb" ref={ref} />
      <HStack height="100vh" width="100vw" justifyItems="stretch" alignItems="stretch">
        
          <AppShell variant="static" minH="100%"
            sidebar={
              <Sidebar>
                <SidebarToggleButton />
                <SidebarSection direction="row">
                <Image src="/images/favicon-96x96.png" height={30} width={30} alt=""/>
                
                  <Spacer />
                  <Menu>
                    <MenuButton as={IconButton} icon={<FaUserCircle size={'2em'}/>} variant="ghost"/>
                    <MenuList>
                    <MenuItem>Home</MenuItem>
                    <Link href="/"> <MenuItem>Sign out</MenuItem></Link>
                    </MenuList>
                  </Menu>
                </SidebarSection>
                <SidebarSection aria-label="Main">
                       <Link href='/dashboard'><NavItem icon={<FiHome />} >Dashboard</NavItem></Link>
                       <NavItem icon={<BiDonateHeart />} isActive>Donation</NavItem>
                       <Link href='/donor'><NavItem icon={<FiUser />}>Donor</NavItem></Link>
                </SidebarSection>
              </Sidebar>
            }
          >
              
        <FiltersProvider filters={filters} onChange={onFilter} >
                  <Page height="400px" contentWidth="full" position="sticky"
                      title="Donation"
                      width="80vw"
                      overflow="hidden"
              
                      toolbar={
                        <Toolbar variant="outline">
                          {/* <SearchInput placeholder="Search" value={Searchvalue}
                              onInput={(e) => setSearchvalue(e.target.value)}
                              onChange={setSearchvalue1}
                              onReset={() => setSearchvalue('')}
                              size="sm" 
                              width={"sm"}
                               /> */}
                         <FiltersAddButton  />
                          <Link href="/adddonation"><Button
                            label="Add Donations"
                             backgroundColor={"#2563eb"} color={"white"} pointerEvents={"none"}
                          >Add Donations</Button></Link>
                        </Toolbar>
                      }
                    >
                     
                      <PageBody fullWidth>
                        <ActiveFiltersList />
                          <Box position="sticky" >
                            <DataGrid 
                                  styleConfig={{ color : '#2563eb' }}
                                  instanceRef={gridRef}
                                  columns={columns}
                                  
                                  isSortable
                                  isSelectable
                                  isHoverable
                                  
                                  initialState={{
                                    pagination: {
                                      pageSize: 20,
                                    }
                                  }}
                                >
                                  <DataGridPagination />
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
    let users = await db.collection("donations").find({}).toArray();
    users = JSON.parse(JSON.stringify(users));

    return {
      props: { users },
    };
  }
