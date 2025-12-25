const mockData = {
    kpis: [
        { title: "Daily Production", value: "950k m³", trend: "down", trendValue: "Target: 1.1M" },
        { title: "Non-Revenue Water", value: "49.9%", trend: "down", trendValue: "High Priority" },
        { title: "Active Customers", value: "1.08M", trend: "up", trendValue: "+2k this month" },
        { title: "System Uptime", value: "92%", trend: "up", trendValue: "Stable" }
    ],
    leaks: [
        { id: "L-101", location: "Accra Central, High St.", severity: "High", status: "Critical", time: "10 mins ago" },
        { id: "L-102", location: "East Legon, Boundary Rd.", severity: "Medium", status: "Investigating", time: "45 mins ago" },
        { id: "L-103", location: "Tema Comm. 4", severity: "Low", status: "Reported", time: "2 hours ago" },
        { id: "L-104", location: "Spintex Road", severity: "High", status: "Resolved", time: "Yesterday" },
        { id: "L-105", location: "Dansoman", severity: "Medium", status: "Resolved", time: "Yesterday" }
    ],
    customers: [
        { id: "C-8821", name: "Kwame Mensah", region: "Greater Accra", status: "Paid", lastBill: "₵ 120.00" },
        { id: "C-9932", name: "Adwoa Boateng", region: "Ashanti", status: "Overdue", lastBill: "₵ 450.50" },
        { id: "C-1120", name: "Kofi Annan", region: "Central", status: "Paid", lastBill: "₵ 85.00" },
        { id: "C-3321", name: "Ama Serwaa", region: "Eastern", status: "Paid", lastBill: "₵ 210.00" },
        { id: "C-4412", name: "John Doe", region: "Greater Accra", status: "Overdue", lastBill: "₵ 300.00" }
    ],
    technicians: [
        { id: "T-01", name: "Emmanuel O.", status: "Busy", task: "Fixing Leak L-101", avatar: "👨🏿‍🔧" },
        { id: "T-02", name: "Sarah J.", status: "Available", task: "Waiting for dispatch", avatar: "👩🏿‍🔧" },
        { id: "T-03", name: "David K.", status: "Busy", task: "Maintenance at Pump St.", avatar: "👨🏿‍🔧" },
        { id: "T-04", name: "Grace A.", status: "Available", task: "On break", avatar: "👩🏿‍🔧" }
    ]
};
