import { useEffect, useState } from "react";
// import clientPromise from "../lib/mongodb";
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { BsChevronRight } from "@react-icons/all-files/bs/BsChevronRight";
import { AppShell } from '@saas-ui/app-shell';
import { useRouter } from 'next/router';
import { Divider } from '@saas-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import { Heading, Spacer, Text, Menu, MenuList, MenuButton, MenuItem, IconButton, HStack, Box, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { PageSidebar, PageSidebarHeader, PageSidebarBody} from '@saas-ui/pro';
import { Form, FormLayout, SubmitButton, Field, Button, PropertyList, Property, Persona, Card, CardBody } from '@saas-ui/react';
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';
import { Page, PageBody, Toolbar } from '@saas-ui/pro';


export default function UpdateDonation() {
  const router = useRouter();
  const query1 = router.query.queryid;

  const [data1, setData] = useState("")
  const [data2, setData2] = useState("")
  const [newid, setData1] = useState(null)
  const[newid2, setData3] = useState(null)
  const [loading, isLoading] = useState(false);
 
  useEffect(() => {
      var currentLocation = window.location.hash;
      let idData = currentLocation.replace("#donation/", "");
      
     
      // let idData = currentLocation.substring(10, 34);
      // let idData2 = currentLocation.substring(35, 60);
      
      setData1(idData);
      isLoading(true);
      
      fetch('/api/donationid',{
        method: "POST",
        body: JSON.stringify({
          id1: query1,
        }),
      })
      .then((res) => res.json())
      .then((res) => setData(res[0]))
      .then((res) => isLoading(false));

     
      
  },[]);

 
  const donorname = data1.Donor;

    
  
  let donordetails = async () => {
    fetch('/api/donorname',{
      method: "POST",
      body: JSON.stringify({
        donor1: donorname,
      }),
    })
    .then((res) => res.json())
    .then((res) => setData2(res[0]));
  }


  let donationDelete = async() =>{
    fetch('/api/donation',{
      method: "DELETE",
      body: JSON.stringify({
        id: query1,
      }),
    }),
    router.push('/donation');
    
  }

  const content = (
    <PropertyList>
      <Property label="Name" value={data2.Donor} />
      <Property label="Email" value={data2.Email} />
      <Property label="Phone" value={data2.Phone} />
      <Property label="Address" value={data2.Address} />
      <Property label="City" value={data2.City} />
      <Property label="State" value={data2.State} />
      <Property label="Country" value={data2.Country} />
      <Property label="Zipcode" value={data2.Zipcode} />
    </PropertyList>
  )

    // const schema = Yup.object({
    //     donor: Yup.string().required().label('Donor Name'),
    //     amount: Yup.number().required().label('Amount').min(1),
    //     date: Yup.string().required().label("Date"),
    //   })
    let handleSubmit = async (params) => {
        let res = await fetch("/api/donation", {
        method: "PUT",
        body: JSON.stringify({
            id: query1,
            donor: params.donor,
            amount: params.amount,
            type: params.type,
            fund: params.fund,
            status1: params.status1,
            date: params.date,
        }),
        });
        if(res.status === 200){
          
            router.push('/donation');
          }
    };

    return(
      
        <HStack height="100vh" width="100vw" justifyItems="stretch" alignItems="stretch">
        <AppShell
            variant="static"
            minH="100%"
           
            sidebar={
              <Sidebar  >
                <SidebarToggleButton />
                <SidebarSection direction="row">
                <Image src="/images/favicon-96x96.png" height={30} width={30} alt=""/>
                  <Spacer />
                  <Menu>
                    <MenuButton as={IconButton} icon={ <FaUserCircle size={'2em'}/> } variant="ghost"/>
                    <MenuList>
                      <MenuItem>Home</MenuItem>
                    <Link href="/"> <MenuItem>Sign out</MenuItem></Link>
                    </MenuList>
                  </Menu>
                </SidebarSection>
                <SidebarSection aria-label="Main">
                    <Link href='/dashboard'><NavItem icon={<FiHome />} >Dashboard</NavItem></Link>
                    <Link href='/donation'><NavItem icon={<FiUser />}>Donation</NavItem></Link>
                    <Link href='/donor'><NavItem icon={<BiDonateHeart />}>Donor</NavItem></Link>
                </SidebarSection>
              </Sidebar>
            }
          >
      
                <Page height="400px" contentWidth="full" position="sticky" isLoading={loading}
                    title={
                      <Breadcrumb spacing="5px" separator={<BsChevronRight color="gray.500"  />} >
                  <BreadcrumbItem>
                    <Link href='/donation' style={{ color: 'black', fontWeight: 'bold', fontSize: '14px'}}>Donation</Link>
                  </BreadcrumbItem>
                
                  <BreadcrumbItem isCurrentPage>
                    <Text>{donorname}</Text>
                  </BreadcrumbItem>
                </Breadcrumb>
                    }
                    width="80vw"
                    overflow="hidden"
                    toolbar={
                      <Toolbar variant="outline">
                      </Toolbar>
                    }
                  >
                    <PageBody >
                    <HStack alignItems="stretch" height="100%" overflowX="hidden" spacing="56" onClick={donordetails} >
                    <Box position="sticky" width="auto" mt={"5"}  onClick={donordetails}>
                        <Heading size={"md"} onClick={donordetails}>Edit Donation Details</Heading>
                        <Text mt={"3"} mb={"4"} color="Muted" onClick={donordetails} >Fill Up The Form Below</Text>
                        <Divider orientation="horizontal"  mb={"4"} maxW="620px" />
                       
                        <Card isHoverable variant="outline" maxW="700px"  onClick={donordetails}>
                            <CardBody>
                            {/* resolver={yupResolver(schema)} */}
                                <Form onSubmit={handleSubmit}>
                                    <FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="donor" label="Donor Name" type="text" defaultValue={data1.Donor} required />
                                            <Field name="amount" label="Amount" type="text" defaultValue={data1.Amount}  required/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="date" label="Date" type="date" defaultValue={data1.Date}   />
                                            <Field name="type" label="Type" type="select" defaultValue={data1.Type}  required
                                            options={[ 
                                                { value: 'Cash' },
                                                { value: 'CreditCard' },
                                                { value: 'Payoneer' },
                                                ]}/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="fund" label="Fund" type="select"  defaultValue={data1.Fund} required
                                            options={[
                                                { value: 'General Fund' },
                                                { value: 'Covid Relif Fund' },
                                                ]}/>
                                            <Field name="status1" label="Status" type="select" defaultValue={data1.Status1} required
                                            options={[
                                                { value: 'Paid' },
                                                { value: 'Unsettled' },
                                                ]} />
                                        </FormLayout>
                                        <FormLayout columns={[1]}>
                                        <Field name="remark" label="Remark" type="text" />
                                        </FormLayout>
                                        <FormLayout columns={[1,2,3,4]} spacing="-10">
                                          <SubmitButton>Save</SubmitButton>
                                          <Button colorScheme={"red"} onClick={donationDelete} >Delete</Button>
                                        </FormLayout>
                                    </FormLayout>
                                </Form>
                            </CardBody>
                        </Card>
                        
                    </Box>
                    <Box>
                    <PageSidebar
                        defaultWidth={280}
                        minWidth="300px"
                        maxWidth="400px"
                        minHeight={'100%'}
                        borderLeftWidth="1px"
                        isOpen
                        isResizable
                      >
                        <PageSidebarHeader defaultWidth={400}
                        minWidth="400px"
                        maxWidth="400px">
                        <Persona name={"Donor Details"} size="xs"  />
                        </PageSidebarHeader>
                        <PageSidebarBody>{content}</PageSidebarBody>
                      </PageSidebar>
                      </Box>
                    </HStack>
                    </PageBody>
                    
                </Page>
           
        </AppShell>
      </HStack>
       
    );
}