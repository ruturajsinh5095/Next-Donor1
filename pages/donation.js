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

    const data1 = [];
    let length1 = (users.users).length;
    for(let i=0; i< length1;i++){
      data1.push(users.users[i]);
    }


      

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
                         
                          <Link href="/adddonation"><Button
                            label="Add Donations"
                             backgroundColor={"#2563eb"} color={"white"} pointerEvents={"none"}
                          >Add Donations</Button></Link>
                        </Toolbar>
                      }
                    >
                     
                      <PageBody fullWidth>
                        
                          <Box position="sticky" >
                      
                              
                          </Box>
                     
                      </PageBody>
                  </Page>
             
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
