import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatUsersPortal.css';
import { Backdrop, Fade, Typography, Button, Modal,Box, Card  } from '@mui/material';
import Chart from 'react-apexcharts'
import moment from 'moment';



const SupportTicketsPortal = () => {
    const [tickets, setTickets] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [series, setSeries] = React.useState([]);
    const [labels, setLabels] = React.useState([]);
    const [options, setOptions] = React.useState({});
    const [chartOptions,setChartOptions] = React.useState({});
    const [conversationsCount, setConversationsCount] = React.useState(null);
    const [ticketsCount, setTicketsCount] = React.useState(null);
    const [chatUsersCount, setChatUsersCount] = useState(null);
    const [supportTicketsCount, setSupportTicketsCount] = useState(null);
    const [leadsCount, setLeadsCount] = useState(null);
    const [barChartOptions,setBarChartOptions] = React.useState({})
    const [totalConversations,setTotalConversations]= React.useState([]);
    const [barChartConversations,setBarChartConversations] = React.useState([]);

    const handleOpen = (conversationId) => {
        console.log("conversationid" + conversationId);
        fetchChatMessages(conversationId);
        setOpen(true);
    };

    const fetchChatMessages = async (conversationId) => {
        try {
            const res = await axios.get('http://localhost:5001/api/getMessages/' + conversationId);
            setMessages(res.data);
        } catch (error) {
            console.error('Error fetching chatbot users:', error);
        }
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchSupportTickets = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/suportTickets');
                setTickets(res.data);
            } catch (error) {
                console.error('Error fetching chatbot users:', error);
            }
        };

        const fetchChatUsersCount = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/chatuserscount');
                setChatUsersCount(res.data.chat_users_count);
            } catch (error) {
                console.error('Error fetching chat users count:', error);
            }
        };

        const fetchSupportTicketsCount = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/supportticketscount');
                setSupportTicketsCount(res.data.support_tickets_count);
            } catch (error) {
                console.error('Error fetching support tickets count:', error);
            }
        };

        const fetchLeadsCount = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/chatusersleadscount');
                setLeadsCount(res.data.leads_count);
                console.log("leads counts"+res.data.leads_count)
                // var pieSeries = series;
                // var pieLabels = labels;
                // pieSeries.push(res.data.leads_count);
                // pieLabels.push('Leads')
                // setLabels(pieLabels);
                // setSeries(pieSeries)
            } catch (error) {
                console.error('Error fetching leads count:', error);
            }
        };

        const fetchLast7DaysConversations = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/getBarChart');
                setBarChartConversations(res.data);
                //console.log("leads counts"+res.data.leads_count)
                // var pieSeries = series;
                // var pieLabels = labels;
                // pieSeries.push(res.data.leads_count);
                // pieLabels.push('Leads')
                // setLabels(pieLabels);
                // setSeries(pieSeries)
            } catch (error) {
                console.error('Error fetching leads count:', error);
            }
        };

        fetchSupportTickets();
        fetchConversations();
        fetchChatUsersCount();
        fetchSupportTicketsCount();
        fetchLeadsCount();
        fetchLast7DaysConversations();
    }, []);



    const fetchConversations = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/getConversations');
            const totalConversations = res.data;
            setTotalConversations(totalConversations);
            const conversationsCount = totalConversations.length;
            var ticketsCount = 0;
            totalConversations.map((item) => {
                if (item.ticket_number != null) {
                    ticketsCount++;
                }
            });
            setTicketsCount(ticketsCount);
            setConversationsCount(conversationsCount);
            // const pieSeries = [];
            // pieSeries.push(ticketsCount);
            // pieSeries.push(conversationsCount - ticketsCount);
            // setSeries(pieSeries);
            // console.log("pieSeries" + pieSeries);
            // setOptions({
            //     labels: labels,
            //     colors: ['#FFA726', '#66BB6A', '#AB47BC'], // Gradient blue colors for pie chart
            // // legend: {
            // //     position: 'bottom'}
            // });
        } catch (error) {
            console.error('Error fetching chatbot users:', error);
        }
    };

    useEffect(()=>{
        if(barChartConversations && barChartConversations.length>0){
            //var xaxis = [moment().format("MMM Do"),moment().subtract(1,"days").format("MMM Do") ];
            var xaxis = [];
            var data= [];
            
            barChartConversations.map((item)=>{
                console.log("conversation date"+moment(item.conversation_date).format("MMM Do"))
                xaxis.push(moment(item.date_trunc).format("MMM Do"))
                data.push(item.count)
                // if(moment(item.conversation_date).format("MMM Do"))
                //ifm(item.conversation_date)
            })
            var seriesData = [{
                name:'Total Conversations',
                data:data
            }]
            console.log("xasix",xaxis)
            console.log("xasix",seriesData)
            setBarChartOptions({
                series:seriesData,
                options:{
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    dataLabels: {
                        enabled: true
                      },
                    plotOptions: {
                        bar: {
                          horizontal: false,
                          columnWidth: '55%',
                          endingShape: 'rounded'
                        },
                      },
                      
                      stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                      },
                    xaxis:{
                        categories:xaxis
                    },
                    title: {
                        text: 'Weekly Insights',
                        floating: true,
                        //offsetY: 330,
                        align: 'center',
                        style: {
                          color: '#444'
                        }
                    },
                    yaxis: {
                        title: {
                          text: 'Total Conversations'
                        }
                      },
                      fill: {
                        opacity: 1
                      },
                }
            })
            

        }

    },[barChartConversations])

    useEffect(()=>{
        if(leadsCount  && ticketsCount   && conversationsCount ){
            var pieSeries = [];
            pieSeries.push(ticketsCount);
            pieSeries.push(conversationsCount - ticketsCount-leadsCount);
            pieSeries.push(parseInt(leadsCount))
            const pieLabels = ['Support tickets', 'Bot Conversations','Leads'];
            // setLabels(pieLabels)
            // setSeries(pieSeries);
            console.log("pieSeries" ,pieSeries);
            const options ={
                labels: pieLabels,
                colors: ['#FFA726', '#66BB6A', '#AB47BC'], // Gradient blue colors for pie chart
            // legend: {
            //     position: 'bottom'}
            };
            console.log("setChartOptions")
            setChartOptions({
                series:pieSeries,
                labels:pieLabels,
                options:options
            })
            console.log("test")
            

        }
        },[leadsCount,ticketsCount,conversationsCount])

        

    

    return (
        <div className="chat-users-portal">
            
            <div className="card-container">
                <Card className="info-card">
                    <div className="info-card-content">
                        <h2>{chatUsersCount}</h2>
                        <p>Total Conversations</p>
                    </div>
                </Card>
                <Card className="info-card">
                    <div className="info-card-content">
                        <h2>{supportTicketsCount}</h2>
                        <p>Total Tickets</p>
                    </div>
                </Card>
                <Card className="info-card">
                    <div className="info-card-content">
                        <h2>{leadsCount}</h2>
                        <p>Total Leads</p>
                    </div>
                </Card>
            </div>
            <div className="chart-container">
            <Card className="chart-card"> 
                <div className="chart-content">
                    {chartOptions.series && <Chart options={chartOptions.options} series={chartOptions.series} type="pie" width="500" height="500"/>}
                </div>
            </Card>
            <Card className="chart-card"> 
                <div className="chart-content">
                    {barChartOptions.series && <Chart options={barChartOptions.options} series={barChartOptions.series} type="bar" width="500" />}
                </div>
            </Card>
        </div>
            {/* <div style={{display:'flex',flexDirection:'row'}}> */}
            {/* {chartOptions && chartOptions.series && chartOptions.options && chartOptions.series.length === 3 && */}
            {/* <div className="donut">
                {console.log("series inside",chartOptions)}
                {chartOptions && chartOptions.series && chartOptions.options && chartOptions.series.length === 3 &&<Chart options={chartOptions.options} series={chartOptions.series} type="pie" width="380" /> }
            </div> 
            <div>
                {console.log("series inside",barChartOptions.series)}
                {barChartOptions && barChartOptions.series && barChartOptions.options && barChartOptions.series.length>0 && <Chart options={barChartOptions.options} series={barChartOptions.series} type="bar" width="380" /> }
            </div> 
            </div> */}
            {/* } */}
            <table className="chat-users-table">
                <thead>
                    <tr>
                        <th>Ticket Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                        <th>Chat History</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index}>
                            <td>{ticket.ticket_number}</td>
                            <td>{ticket.name}</td>
                            <td>{ticket.email}</td>
                            <td>{ticket.contact}</td>
                            <td>{ticket.status}</td>
                            <td>
                                <Button style={{marginRight:10}}variant='contained' onClick={() => handleOpen(ticket.conversationid)}>View</Button>
                                <Button variant='outlined'>Approve</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="chat-support-container">
                    <div className="chat-header">
                        <span>Chat History</span>
                    </div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.role}`}>
                                <div className="chat-message-role">{msg.role === 'user' ? 'You' : 'MAP Team'}</div>
                                <div className="chat-message-content">{msg.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SupportTicketsPortal;

