# ☄️ NASA Monitoring Dashboard
**Nokia Recruitment Project** – A high-performance monitoring dashboard tracking Near-Earth Objects (NEOs) using NASA's Open APIs.

[**🚀 View Deployed Project**](https://MichalKaszowski.github.io/nasa-monitoring-dashboard)

<img width="1897" alt="Dashboard Overview" src="https://github.com/user-attachments/assets/b087a0f4-9090-4410-932a-dceff2adc19e" />

---

## 🚀 Features
The application provides a comprehensive interface for analyzing asteroid data with a focus on UX and data visualization:

* **Data Fetching:** Retrieves asteroid data by specific date ranges from the [NASA NeoWS API](https://api.nasa.gov/).
* **Interactive Data Management:** Features a robust table with built-in **sorting** and **filtering** to manage large datasets efficiently.
* **Risk Visualization Suite:**
    * **Size Comparison:** Visualizes the Top 5 largest asteroids (by max diameter) relative to famous Earth buildings.
    * **Hazard Map:** A scatter plot analyzing the correlation between **velocity** and **lunar distance**, identifying potentially hazardous objects.
    * **Statistical Breakdown:** A donut chart showing the proportion of hazardous vs. non-hazardous asteroids.

### Data Visualization 

| Size Comparison | Hazard Analysis |
| :--- | :--- |
| <img width="100%" src="https://github.com/user-attachments/assets/76bc14ad-b2c8-42d2-80e7-c0d4651ed510" /> | <img width="100%" src="https://github.com/user-attachments/assets/add504de-2aec-4441-b505-d154ad08a79b" /> |

| Hazard Proportion |
| :--- |
| <img width="100%" src="https://github.com/user-attachments/assets/0c02e5ad-a61d-478d-8891-fbdf329ba18b" /> |

---

## 🛠️ Tech Stack
* **Frontend:** React.js / TypeScript
* **UI Framework:** Material UI (MUI)
* **Data Source:** NASA Near Earth Object Web Service (NeoWS)
* **Deployment:** GitHub Pages

---

## 📱 Responsiveness
Using a MUI's **mobile-first design philosophy**, the dashboard is fully optimized for all screen sizes.

### Mobile & Tablet Performance

<p align="left">
  <img width="250" alt="Mobile View" src="https://github.com/user-attachments/assets/7e7e71a0-8802-4a09-842d-f92a787cb471" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="400" alt="Tablet View" src="https://github.com/user-attachments/assets/172511ba-aaf3-428b-8914-f222a858d12e" />
</p>

---

## ⚙️ How to run the app locally: 
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/MichalKaszowski/nasa-monitoring-dashboard.git](https://github.com/MichalKaszowski/nasa-monitoring-dashboard.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```
