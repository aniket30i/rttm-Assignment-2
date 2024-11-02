# RTTM Project

This project implements Role-Based Access Control (RBAC) using a frontend stack powered by Vite and React. The application includes charts, UI components, and more to provide a comprehensive user experience.

## Features

- **Task Manager** : Task creation , update , filtering and status tracking
- **WebSocket**:For Real time communication within apps
- **JSON Server**: Simple local REST API with `json-server` for data simulation.
- **Notifications**: Real time notifications and alerts
-**Responsive Design** : Fit for smaller and medium screen sizes too

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aniket30i/rttm-Assignment-2.git
   cd rttm
2. **Install Dependencies**: (WebsocketServer)
```bash
npm install
```
3. **Install Dependencies**: (TaskBoard - Notifications + Task List UI)
```bash
cd secondary
npm install
```
4. **Install Dependencies**: (TaskMaster - CRUD UI)
```bash
cd primary
npm install
```

##  To run the application and function properly follow the steps:
1.	Open 3 console and run 2 json-server and Websocket server for notifications. The port is hard coded to 3080 for task server and 3070 for notification server therefore the commands 

```bash
npx json-server --watch db/tasks.json --port 3080
```

```bash
npx json-server --watch db/notifications.json --port 3070
```
2. Starting the Websocket server:
```bash
cd server 
node server.js
```
3. Starting the development server - Primary - CRUD UI
```bash
cd primary
npm run dev
```

4. Starting the development server - Secondary - Notifications + Tasks List UI
```bash
cd secondary
npm run dev
```
