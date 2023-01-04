import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { BsChevronRight } from "@react-icons/all-files/bs/BsChevronRight";
import { AppShell } from '@saas-ui/app-shell';
import { React, useState } from 'react';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Heading, Spacer, Text, Menu,MenuList, MenuButton, MenuItem, IconButton, HStack, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Card, CardBody, PropertyList, Property, Persona, Form, FormLayout, Field, SubmitButton, Divider } from '@saas-ui/react';
import { Page, PageBody, Toolbar, PageSidebar, PageSidebarHeader, PageSidebarBody} from '@saas-ui/pro';
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';

export default function DonationAdd(users) {
    const router = useRouter();
    const query1 = router.query.queryid;
    const [data2, setData2] = useState("");
    // const [firstname, setfirstname] = useState("");
    // const [amount, setAmount] = useState("");
    // const [date1, setDate ] = useState("");
    // const[type,setType] = useState("");
    var someDate = new Date();
    var date = someDate.setDate(someDate.getDate());
    var defaultDate = new Date(date).toISOString().split("T")[0];


    // const [Donornames, setDonor] = useState([]);
    const schema = Yup.object({
        donor: Yup.string().required().label('Donor Name'),
        amount: Yup.string().required().label('Amount'),
        date: Yup.string().required().label("Date"),
      })

  //   let handleSubmit = async (e) => {
  //     let res = await fetch("/api/donation", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       firstname: firstname,
  //       Amount: amount,
  //       Date: date1,
  //       Type: type,
  //     }),
  //     });  
  //     // setUsersState([...usersState, res]);
  //     setfirstname("");
  //     setAmount("");
  //     setDate("");
  //     setType("");
  // }

      
    let handleSubmit = async (params) => {
        let res = await fetch("/api/donation", {
        method: "POST",
        body: JSON.stringify({
            Donor: params.donor,
            Amount: params.amount,
            Type: params.type,
            Fund: params.fund,
            Status1: params.status1,
            Date: params.date,
        }),
        });
        if(res.status === 200){
          
            router.push('/donor');
          }
          // setDonor("");
          // setDateValue(today);
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
      
                <Page height="400px" contentWidth="full" position="sticky"
                    title={
                      <Breadcrumb spacing="5px" separator={<BsChevronRight color="gray.500"  />}>
                  <BreadcrumbItem>
                    <Link href='/donor' style={{ color: 'black', fontWeight: 'bold', fontSize: '14px'}}>Donor</Link>
                  </BreadcrumbItem>
                
                  <BreadcrumbItem isCurrentPage>
                  <Text>{query1}</Text>
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

                    <PageBody>
                    <HStack alignItems="stretch" height="100%" overflowX="hidden" spacing="56">
                    <Box position="sticky" width="auto" mt={"5"}>
                        <Heading size={"md"}>Add Donation Details</Heading>
                        <Text mt={"3"} mb={"4"} color="Muted">Fill Up The Form Below</Text>
                        <Divider orientation="horizontal"  mb={"4"} maxW="600px" />
                        <Card isHoverable variant="outline" maxW="600px">
                            <CardBody>
                                <Form onSubmit={handleSubmit} resolver={yupResolver(schema)}>
                                    <FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                          {/* <Box marginTop={'0'}>
                                            <Text style={{ fontSize: '14px' , margin: '0px 12px 8px 0px' }}>Donor Name</Text>
                                            <AutoComplete openOnFocus >
                                              <AutoCompleteInput  />
                                              <AutoCompleteList  >
                                                {donorname.map((Donornames, cid) => (
                                                  <AutoCompleteItem
                                                    key={`option-${cid}`}
                                                    value={Donornames}
                                                    textTransform="capitalize"
                                                  >
                                                    {Donornames}
                                                  </AutoCompleteItem>
                                                ))}
                                              </AutoCompleteList>
                                            </AutoComplete>
                                          </Box> */}
                                          <Field name="donor" label="Donor Name" type="text"  defaultValue={query1} required/>
                                            <Field name="amount" label="Amount" type="number" min="0"  required/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="date" label="Date" type="date" defaultValue={defaultDate} />
                                            <Field name="type" label="Type" type="select" placeholder="Choose Payment Type"
                                            options={[
                                                { value: 'Cash' },
                                                { value: 'CreditCard' },
                                                { value: 'Payoneer' },
                                                ]}/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="fund" label="Fund" type="select" placeholder="Choose Fund" required
                                            options={[
                                                { value: 'General Fund' },
                                                { value: 'Covid Relif Fund' },
                                                ]}/>
                                            <Field name="status1" label="Status" type="select" placeholder="Choose Status" required
                                            options={[
                                                { value: 'Paid' },
                                                { value: 'Unsettled' },
                                                ]} />
                                        </FormLayout>
                                        <FormLayout columns={[1]}>
                                        <Field name="remark" label="Remark" type="text" />
                                        </FormLayout>
                                        <FormLayout columns={[1,2]}>
                                        <SubmitButton disableIfUntouched>Save</SubmitButton>
                                        </FormLayout>
                                    </FormLayout>
                                </Form>
                                {/* <Form onSubmit={handleSubmit}>
                                    <FormLayout>
                                      
                                      <FormLayout columns="2">
                                        <Field name="firstname" label="Name" value={firstname} onChange={(e) => {setfirstname(e.target.value)}}  />
                                        <Field name="amount" label="Amount" type="text" value={amount} onChange={(e) => {setAmount(e.target.value)}} />
                                      </FormLayout>
                                      <FormLayout columns="2">
                                        <Field name="date" label="Date" type="date" value={date1} onChange={(e) => {setDate(e.target.value)}} />
                                        <Field name="type" label="Type" type="select" defaultValue={'Cash'} value={type} onChange={(e) => {setType(e.target.value)}}
                                            options={[
                                                { value: 'Cash' },
                                                { value: 'CreditCard' },
                                                { value: 'Payoneer' },
                                                ]}/>
                                      </FormLayout>

                                      

                                      <SubmitButton>Complete order</SubmitButton>
                                    </FormLayout>
                                </Form> */}
                            </CardBody>
                        </Card>
                    </Box>
                    <Box>
                    <PageSidebar
                        defaultWidth={400}
                        minWidth="200px"
                        maxWidth="500px"
                        minHeight={'100%'}
                        borderLeftWidth="1px"
                        // isResizable
                        // isOpen
                      >
                        <PageSidebarHeader>
                        <Persona name={"Donor Details"} size="xs" />
                        </PageSidebarHeader>
                        <PageSidebarBody>{content}</PageSidebarBody>
                      </PageSidebar>
                      </Box>

                    </HStack>
                    </PageBody>
                </Page>
           
        </AppShell>
      </HStack>
       
    )
}
