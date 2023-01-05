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
  const [Searchvalue, setSearchvalue] = React.useState('');
  const [SearchResultShow, setSearchResultShow] = React.useState(false);

  let setSearchvalue1 = async () => {
    let res = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      body: JSON.stringify({
        Searchvalue: Searchvalue,
      }),
    });
    
    const SearchResult = res.data;
    return SearchResult
    
  };

  useEffect(() => {
    ref.current.continuousStart();
    ref.current.complete();
    
  },[]);

  // setSearchvalue1().then((r)=> console.log(r));
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
    const data1 = [];
    let length1 = (users.users).length;
    for(let i=0; i< length1;i++){
      data1.push(users.users[i]);
    }
    const Donor_id = data1[0].Donor_id;

    let onNextpage = (_id) => {
      ref.current.continuousStart();
      ref.current.complete();
      router.push({
        pathname: '/updatedonation',
        query: {queryid : _id.original._id}
     });
    };

//     let updateDonation = (_id) => {
//       router.push({
//         pathname: '/updatedonation',
//         query: {queryid : _id}
//       });
//     };
    
//     let deleteDonation = async(_id) =>{
//       fetch('/api/donation',{
//         method: "DELETE",
//         body: JSON.stringify({
//           id: _id,
//         }),
//       }),
//       router.push('/donation');
      
//     }

    

    const defaultFilters = [{ id: 'type', operator: 'is', value: 'All' }]
    const columns  = [
          {
            id: 'Donor',
            accessor: 'Donor',
            Header: 'Donor',
            filterFn: useDataGridFilter('string'),
            size: 90,
           
          },
          {
            id: 'Amount',
            accessor: 'Amount',
            Header: 'Amount',
            filterFn: useDataGridFilter('string'),
            size: 70,
           
          },
          {
            id: 'Type',
            accessor: 'Type',
            Header: 'Type',
            filterFn: useDataGridFilter('string'),
            size: 90,
           
          },
          {
            id: 'Fund',
            accessor: 'Fund',
            Header: 'Fund',
            filterFn: useDataGridFilter('string'),
            size: 90,
            
          },
          {
            id: 'Date',
            accessor: 'Date',
            Header: 'Date',
            size: 90,
            filterFn: useDataGridFilter('date'),
            meta: {
              href: ({ _id }) => `#donation/${_id}`,
             },
            
          },
          
    ];

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

    const [type, setType] = React.useState('new');

      const filteredData = React.useMemo(() => {
        return data1.filter((row) => {
          return row.type === type
        })
      }, [type])  

      

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
                                  data={data1}
                                  isSortable
                                  isSelectable
                                  isHoverable
                                  onRowClick={onNextpage}
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
