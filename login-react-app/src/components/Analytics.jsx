import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import { LineChart, Line, CartesianGrid } from 'recharts';
import { RiArrowRightDoubleLine } from "react-icons/ri";


const MovieAnalytics = () => {
    const movies = [
        { title: "Movie A", views: 160 },
        { title: "Movie B", views: 250 },
        { title: "Movie C", views: 200 },
        { title: "Movie D", views: 350 },
        { title: "Movie E", views: 70 },
    ];

    const subscription = [
        { name: 'Free', users: 50 },
        { name: 'Premium', users: 30 },
        { name: 'Premium+', users: 20 },
    ];

    const activityData = [
        { time: "8 AM", users: 50 },
        { time: "9 AM", users: 60 },
        { time: "10 AM", users: 70 },
        { time: "11 AM", users: 80 },
        { time: "12 PM", users: 90 },
        { time: "1 PM", users: 110 },
        { time: "2 PM", users: 130 },
        { time: "3 PM", users: 150 },
        { time: "4 PM", users: 180 },
        { time: "5 PM", users: 200 },
        { time: "6 PM", users: 250 },
        { time: "7 PM", users: 220 },
        { time: "8 PM", users: 180 },
        { time: "9 PM", users: 150 },
        { time: "10 PM", users: 130 },
        { time: "11 PM", users: 200 },
        { time: "12 AM", users: 190 },
        { time: "1 AM", users: 170 },
      ];

    return (
        <div>
            <h1 className='dashboard-title'>Dashboard</h1>
            <div className='analytics-container'>
                <div className='stats-container'>
                    <div className='box-1'>
                        <h3>Users</h3> 
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                            <h4>4K</h4>
                            <p style={{backgroundColor: '#021D02', borderRadius: '30px', color:'#A1E8A1', border: '2px solid #042F04', padding: '5px'}}>+15%</p>
                        </div>
                        <p>Last 30 days</p>
                        <ResponsiveContainer width="100%" height={50}>
                            <LineChart
                                data={[
                                    { x: 1, y: 10 },
                                    { x: 2, y: 15 + Math.sin(2) * 5 },
                                    { x: 3, y: 20 + Math.sin(3) * 10 },
                                    { x: 4, y: 30 + Math.sin(4) * 15 },
                                    { x: 5, y: 40 + Math.sin(5) * 20 },
                                    { x: 6, y: 55 + Math.sin(6) * 25 },
                                ]}
                            >
                                <Line type="monotone" dataKey="y" stroke="#82ca9d" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='box-2'>
                        <h3>Sign-ups</h3>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                            <h4>100</h4>
                            <p style={{backgroundColor: '#1E0101', borderRadius: '30px', color:'#FC9C9C', border: '2px solid #380202', padding: '5px'}}>-10%</p>
                        </div>
                        <p>Last 30 days</p>
                        <ResponsiveContainer width="100%" height={50}>
                            <LineChart
                                data={[
                                    { x: 1, y: 100 - Math.sin(1) * 10 },
                                    { x: 2, y: 90 - Math.sin(2) * 15 },
                                    { x: 3, y: 80 - Math.sin(3) * 20 },
                                    { x: 4, y: 70 - Math.sin(4) * 25 },
                                    { x: 5, y: 60 - Math.sin(5) * 30 },
                                    { x: 6, y: 50 - Math.sin(6) * 35 },
                                ]}
                            >
                                <Line type="monotone" dataKey="y" stroke="#590303" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='box-3'>
                        <h3>Revenue</h3>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                            <h4>100K</h4>
                            <p style={{backgroundColor: '#021D02', borderRadius: '30px', color:'#A1E8A1', border: '2px solid #042F04', padding: '5px'}}>+10%</p>
                        </div>
                        <p>Last 30 days</p>
                        <ResponsiveContainer width="100%" height={50}>
                            <LineChart data={[{ x: 1, y: 500 }, { x: 2, y: 700 }, { x: 3, y: 1200 }]}>
                                <Line type="monotone" dataKey="y" stroke="#82ca9d" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='box-4'>
                        <h3>Explore your data</h3>
                        <p>Uncover performance and visitor insights</p>
                        <button style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>Get Insights<RiArrowRightDoubleLine /></button>
                    </div>
                </div>

                <div className='bargraph-container'>
                    <h2>Most Viewed Movies</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={movies}>
                            <XAxis dataKey="title" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Bar dataKey="views" fill="#785CB3" radius={[10, 10, 0, 0]} width={10}/>
                            {/* <Tooltip /> */}
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className='piechart-container'>
                    <h2>Subscription Types</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                dataKey="users"
                                data={subscription}
                                cx="50%" 
                                cy="50%" 
                                innerRadius={40} 
                                outerRadius={80} 
                                label
                            >
                                <Cell fill="#502891" /> 
                                <Cell fill="#785CB3" />
                                <Cell fill="#B3ABE7" /> 
                            </Pie>
                            <Tooltip/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='linechart-container'>
                    <h2>Activity Times</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={activityData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" stroke="#fff"/>
                            <YAxis stroke="#fff"/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
            </div>
        </div>   
    );
}

export default MovieAnalytics;
