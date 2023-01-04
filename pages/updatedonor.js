import { useEffect, useState } from "react";
// import clientPromise from "../lib/mongodb";
import React from "react";
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { BsChevronRight } from "@react-icons/all-files/bs/BsChevronRight";
import { RiRefund2Fill } from "@react-icons/all-files/ri/RiRefund2Fill";
import { FiCircle } from "@react-icons/all-files/fi/FiCircle";
import { useRef } from "react";
import { AppShell } from '@saas-ui/app-shell';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Tab, TabList, TabPanel, TabPanels, Tabs, Heading, Spacer, Text, Menu, MenuList, MenuButton, MenuItem, IconButton, HStack, Breadcrumb, BreadcrumbItem, Badge } from '@chakra-ui/react';
import { Divider, Form, FormLayout, Field, SubmitButton, Button, Card, CardBody } from '@saas-ui/react';
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';
import { Page, PageBody, Toolbar, DataGrid, useDataGridFilter, FiltersAddButton, FiltersProvider, ActiveFiltersList } from '@saas-ui/pro';

export default function UpdateDonor() {
  const router = useRouter();
  const query1 = router.query.queryid;

  const gridRef = useRef();
  const [data1, setData] = useState("")
  const [data2, setData2] = useState("")
  const [newid, setData1] = useState(null)
  const [loading, isLoading] = useState(false);

  useEffect(() => {
      var currentLocation1 = window.location.hash;
      let idData1 = currentLocation1.replace("#donor/", "");
      setData1(idData1);
      isLoading(true);

      fetch('/api/donorid',{
        method: "POST",
        body: JSON.stringify({
          id1: query1,
        }),
      })
      .then((res) => res.json())
      .then((res) => setData(res[0]))
      .then((res) => isLoading(false));
      

  }, []);

  const donorname = data1.Donor;
  
  let donationdetails = async () => {
    
    fetch('/api/donationname',{
      method: "POST",
      body: JSON.stringify({
        donor1: donorname,
      }),
    })
    .then((res) => res.json())
    .then((res) => setData2(res));
  }

  let donationAdd = () => {
    router.push({
      pathname: '/DonationAdd',
      query: {queryid : donorname}
    });
  };

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
      accessor: 'Donor',
      Header: 'Donor',
      filterFn: useDataGridFilter('string'),
      size: 70,
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
      size: 70,
    },
    {
      id: 'Fund',
      accessor: 'Fund',
      Header: 'Fund',
      filterFn: useDataGridFilter('string'),
      size: 70,
    },
    {
      id: 'Date',
      accessor: 'Date',
      Header: 'Date',
      filterFn: useDataGridFilter('date'),
    },
  ];


  // let deleteDonor = async() =>{
  //   fetch('/api/donor',{
  //     method: "DELETE",
  //     body: JSON.stringify({
  //       id: newid,
  //     }),
  //   })
  //   router.push('/donor');
  // }

    // const schema = Yup.object({
    //     donor: Yup.string().required().label('Donor Name'),
    //     Email: Yup.string().email().required().label('Email'),
    //     Phone: Yup.number().required().label("Phone"),
    //     Address: Yup.string().required().label("Address"),
    //     City: Yup.string().required().label("City"),
    //     State: Yup.string().required().label("State"),
    //     Country: Yup.string().required().label("Country"),
    //     Zipcode: Yup.number().required().label("Zipcode"),
    //   })
    let handleSubmit = async (params) => {
        let res = await fetch("/api/donor", {
        method: "PUT",
        body: JSON.stringify({
            id: query1,
            donor: params.donor,
            Email: params.Email,
            Phone: params.Phone,
            Address: params.Address,
            City: params.City,
            State: params.State,
            Country: params.Country,
            Zipcode: params.Zipcode,
        }),
        });
        if(res.status === 200){
          
            router.push('/donor');
          }
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


    return(
      
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
            <FiltersProvider filters={filters} onChange={onFilter}>
                <Page height="400px" contentWidth="full" position="sticky" isLoading={loading}
                    title={
                      <Breadcrumb spacing="5px" separator={<BsChevronRight color="gray.500"  />}>
                  <BreadcrumbItem>
                    <Link href='/donor' style={{ color: 'black', fontWeight: 'bold', fontSize: '14px'}}>Donor</Link>
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
                    <PageBody fullWidth>
                    <HStack alignItems="stretch" height="100%" overflowX="hidden" spacing="0">
                    <Tabs
                        colorScheme="primary"
                        isLazy
                        flex="1"
                        minH="0"
                        display="flex"
                        flexDirection="column"
                      >
                        <TabList borderBottomWidth="1px" height="12">
                          <Tab>Details</Tab>
                          <Tab onClick={donationdetails}>Donations</Tab>
                        </TabList>
                        <TabPanels
                          py="6"
                          overflowY="auto"
                          maxW="container"
                          margin="0 auto"
                          flex="1"
                        >
                          <TabPanel px={'6'}>
                            <Heading size={"md"} overflow='hidden'>Edit Donor Details</Heading>
                            <Text mt={"2"} mb={"4"} color="Muted" >Fill Up The Form Below</Text>
                              <Divider orientation="horizontal"  mb={"4"} maxW="600px" />
                                <Card isHoverable variant="outline" maxW="600px">
                                  <CardBody>
                                  {/* resolver={yupResolver(schema)} */}
                                              <Form onSubmit={handleSubmit}>
                                                  <FormLayout>
                                                      <FormLayout columns={[1, null, 2]}>
                                                          <Field name="donor" label="Donor Name" type="text" defaultValue={data1.Donor}  required />
                                                          <Field name="Email" label="Email" type="email" defaultValue={data1.Email} required/>
                                                      </FormLayout>
                                                      <FormLayout columns={[1, null, 2]}>
                                                          <Field name="Phone" label="Phone" type="text" defaultValue={data1.Phone}  />
                                                          <Field name="Address" label="Address" type="text" defaultValue={data1.Address} required />
                                                      </FormLayout>
                                                      <FormLayout columns={[1, null, 2]}>
                                                          <Field name="City" label="City" type="text" defaultValue={data1.City} required />
                                                          <Field name="State" label="State" type="text" defaultValue={data1.State} required />
                                                      </FormLayout>
                                                      <FormLayout columns={[1, null, 2]}>
                                                      <Field name="Country" label="Country" type="text" defaultValue={data1.Country} required />
                                                      <Field name="Zipcode" label="Zipcode" type="text" defaultValue={data1.Zipcode} required />
                                                      </FormLayout>
                                                      <FormLayout columns={[1,2,3,4]} spacing="-10">
                                                      <SubmitButton >Save</SubmitButton>
                                                      <Button colorScheme={"red"} disabled>Delete</Button>
                                                      {/* onClick={deleteDonor} */}
                                                      </FormLayout>
                                                  </FormLayout>
                                              </Form>
                                  </CardBody>
                                </Card>
                          </TabPanel>
                          <TabPanel px={'0'}>
                          <Toolbar variant="outline" px={'3'}>
                          <FiltersAddButton  />
                            <Button
                              label="Add Donations"
                              backgroundColor={"#2563eb"} color={"white"}  onClick={donationAdd}
                            >Add Donations</Button>
                        </Toolbar>
                        <ActiveFiltersList />
                          <DataGrid
                                instanceRef={gridRef}
                                columns={columns}
                                data={data2}
                                isSortable
                                isSelectable
                                isHoverable
                            />
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </HStack>
                      </PageBody>
                </Page>
                </FiltersProvider>
        </AppShell>
      </HStack>
       
    )
}