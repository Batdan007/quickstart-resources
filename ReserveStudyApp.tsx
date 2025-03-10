import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Building, Clipboard, FileText, Camera, DollarSign, Download, CheckCircle, AlertCircle } from 'lucide-react';
import _ from 'lodash';

const ReserveStudyApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projectData] = useState({
    name: 'Golf View Manor II',
    address: '5683 Rattlesnake Hammock Rd, Naples, FL 34113',
    constructionDate: '1980',
    buildingCount: 4,
    totalUnits: 75,
    lastInspection: '2024-12-10'
  });
  
  const [components, setComponents] = useState<any[]>([]);
  const [financialData, setFinancialData] = useState({
    startingBalance: 143858,
    annualContribution: 42600,
    fundingGoal: 'baseline',
    projectionYears: 30,
    yearlyData: [] as any[],
    fundingOptions: {
      baseline: 44709,
      threshold: 55751,
      fullyFunded: 60165
    }
  });
  
  useEffect(() => {
    const componentData = [
      {
        id: 1,
        name: 'Roof - Flat, TPO',
        category: 'Roof',
        quantity: '330',
        unit: 'SQ',
        usefulLife: 25,
        remainingLife: 11,
        replacementCost: 448800,
        condition: 'fair',
        lastReplaced: '2006'
      },
      {
        id: 2,
        name: 'Roof - Mansard, Asphalt Shingle',
        category: 'Roof',
        quantity: '68',
        unit: 'SQ',
        usefulLife: 25,
        remainingLife: 8,
        replacementCost: 49980,
        condition: 'fair',
        lastReplaced: '2006'
      },
      {
        id: 3,
        name: 'Stairways & Walkways',
        category: 'Structure',
        quantity: '11,670',
        unit: 'SF',
        usefulLife: 7,
        remainingLife: 5,
        replacementCost: 37928,
        condition: 'good',
        lastReplaced: '2021'
      },
      {
        id: 4,
        name: 'Exterior Wall Finishes',
        category: 'Waterproofing',
        quantity: '39,465',
        unit: 'SF',
        usefulLife: 10,
        remainingLife: 7,
        replacementCost: 98663,
        condition: 'good',
        lastReplaced: '2021'
      },
      {
        id: 5,
        name: 'Elevator',
        category: 'Mechanical',
        quantity: '2',
        unit: 'EA',
        usefulLife: 30,
        remainingLife: 28,
        replacementCost: 250000,
        condition: 'excellent',
        lastReplaced: '2023'
      },
      {
        id: 6,
        name: 'Fire Alarm & Life Safety Systems',
        category: 'Fireproofing',
        quantity: '4',
        unit: 'EA',
        usefulLife: 15,
        remainingLife: 11,
        replacementCost: 20000,
        condition: 'good',
        lastReplaced: '2020'
      },
      {
        id: 7,
        name: 'Plumbing',
        category: 'Plumbing',
        quantity: '1',
        unit: 'LS',
        usefulLife: 10,
        remainingLife: 8,
        replacementCost: 25000,
        condition: 'good',
        lastReplaced: '2022'
      },
      {
        id: 8,
        name: 'Electrical System',
        category: 'Electrical',
        quantity: '1',
        unit: 'LS',
        usefulLife: 25,
        remainingLife: 20,
        replacementCost: 35000,
        condition: 'good',
        lastReplaced: '2020'
      }
    ];
    
    setComponents(componentData);
    generateFinancialProjections(componentData);
  }, []);
  
  const generateFinancialProjections = (componentData: any[]) => {
    const yearlyExpenditures = Array(30).fill(0);
    
    componentData.forEach(component => {
      const replacementYear = Math.floor(component.remainingLife);
      if (replacementYear < 30) {
        yearlyExpenditures[replacementYear] += Number(component.replacementCost);
      }
    });
    
    const { baseline, threshold, fullyFunded } = financialData.fundingOptions;
    const yearlyData = [];
    let baselineBalance = financialData.startingBalance;
    let thresholdBalance = financialData.startingBalance;
    let fullyFundedBalance = financialData.startingBalance;
    
    for (let year = 0; year < 30; year++) {
      baselineBalance = baselineBalance + baseline - yearlyExpenditures[year];
      thresholdBalance = thresholdBalance + threshold - yearlyExpenditures[year];
      fullyFundedBalance = fullyFundedBalance + fullyFunded - yearlyExpenditures[year];
      
      yearlyData.push({
        year: 2025 + year,
        expenditures: yearlyExpenditures[year],
        baselineBalance,
        thresholdBalance,
        fullyFundedBalance
      });
    }
    
    setFinancialData(prev => ({ ...prev, yearlyData }));
  };
  
  const calculateCompletion = () => {
    const tasks = { projectInfo: true, componentInventory: true, financialAnalysis: true, photos: false, compliance: true };
    const completed = Object.values(tasks).filter(Boolean).length;
    return Math.round((completed / Object.values(tasks).length) * 100);
  };
  
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{projectData.name}</h2>
          <p className="text-gray-600">{projectData.address}</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{calculateCompletion()}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">30</div>
            <div className="text-sm text-gray-600">Days Left</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{components.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Replacement Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${components.reduce((sum, c) => sum + c.replacementCost, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.annualContribution.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>30 Year Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData.yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="baselineBalance" stroke="#3b82f6" name="Baseline" strokeWidth={2} />
                <Line type="monotone" dataKey="thresholdBalance" stroke="#10b981" name="Threshold" strokeWidth={2} />
                <Line type="monotone" dataKey="fullyFundedBalance" stroke="#f59e0b" name="Fully Funded" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Critical Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {components
                .filter(c => c.remainingLife < 10)
                .sort((a, b) => a.remainingLife - b.remainingLife)
                .map(component => (
                  <div key={component.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{component.name}</h3>
                      <p className="text-sm text-gray-600">
                        {component.remainingLife <= 0 ? 'Replacement Due Now' : `${component.remainingLife} years remaining`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${component.replacementCost.toLocaleString()}</p>
                      <p className={`text-sm ${
                        component.remainingLife <= 2 ? 'text-red-500' : 
                        component.remainingLife <= 5 ? 'text-amber-500' : 'text-green-500'
                      }`}>
                        {component.condition}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Component Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={
                  _.chain(components)
                   .groupBy('category')
                   .map((items, category) => ({
                     category,
                     cost: _.sumBy(items, 'replacementCost')
                   }))
                   .value()
                }>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="cost" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  const ComponentsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Component Inventory</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600">
          <FileText className="w-4 h-4" />
          Export Components
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Useful Life</th>
              <th className="p-3 text-left">Remaining Life</th>
              <th className="p-3 text-left">Replacement Cost</th>
              <th className="p-3 text-left">Condition</th>
              <th className="p-3 text-left">Last Replaced</th>
            </tr>
          </thead>
          <tbody>
            {components.map(component => (
              <tr key={component.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{component.name}</td>
                <td className="p-3">{component.category}</td>
                <td className="p-3">{component.quantity} {component.unit}</td>
                <td className="p-3">{component.usefulLife} years</td>
                <td className="p-3">
                  <span className={`${
                    component.remainingLife <= 2 ? 'text-red-500' : 
                    component.remainingLife <= 5 ? 'text-amber-500' : 'text-green-500'
                  }`}>
                    {component.remainingLife} years
                  </span>
                </td>
                <td className="p-3">${component.replacementCost.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    component.condition === 'excellent' ? 'bg-green-100 text-green-800' :
                    component.condition === 'good' ? 'bg-blue-100 text-blue-800' :
                    component.condition === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {component.condition}
                  </span>
                </td>
                <td className="p-3">{component.lastReplaced}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  const FinancialView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Financial Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-500 bg-blue-50">
          <CardHeader>
            <CardTitle>Baseline Funding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${financialData.fundingOptions.baseline.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Minimum funding to keep reserves above zero
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Threshold Funding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${financialData.fundingOptions.threshold.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Maintain 50% of fully funded balance
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Fully Funded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              ${financialData.fundingOptions.fullyFunded.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Maintain 100% of fully funded balance
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Expenditure Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData.yearlyData.slice(0, 15)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                <Bar dataKey="expenditures" fill="#ef4444" name="Expenditures" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const ReportsView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Report Generation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              SIRS Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Complete Structural Integrity Reserve Study report
            </p>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Generate Word Report
            </button>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Financial Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Excel spreadsheet with detailed financial projections
            </p>
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Generate Excel Report
            </button>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Photo Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Visual documentation with component photos
            </p>
            <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Generate Photo Report
            </button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Report Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Project Information', status: true },
              { name: 'Component Inventory', status: true },
              { name: 'Financial Analysis', status: true },
              { name: 'Site Photos', status: false }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  {item.status ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  )}
                  <span>{item.name}</span>
                </div>
                <span className={item.status ? 'text-green-600' : 'text-amber-600'}>
                  {item.status ? 'Complete' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold">MECA Engineering - Reserve Study Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Last Updated: Dec 10, 2024</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-6 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Clipboard },
            { id: 'components', label: 'Components', icon: Building },
            { id: 'financial', label: 'Financial', icon: DollarSign },
            { id: 'reports', label: 'Reports', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <main>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'components' && <ComponentsView />}
          {activeTab === 'financial' && <FinancialView />}
          {activeTab === 'reports' && <ReportsView />}
        </main>
      </div>
    </div>
  );
};

export default ReserveStudyApp;
