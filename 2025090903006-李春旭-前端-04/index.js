function orderStudentGrade(students) {
    //Todo:你只需要补全该函数
    // 计算每个学生的总分
    const studentsTotal = students.map(student => {
        const total = student.classPerformance + student.defense + student.finalExam ;
        return {
            ...student,
            total,
        };
    });
    // 按小组分组
    const groupClass = {};
      studentsTotal.forEach(student => {
        if (!groupClass[student.class]) {
            groupClass[student.class] = [];
        }
        groupClass[student.class].push(student);
    });
    // 对每组内的学生按总成绩降序排序
    Object.keys(groupClass).forEach(cls => {
        groupClass[cls].sort((a, b) => b.total - a.total);
    });
    return groupClass;
}
const output = document.getElementById("output-container");
//这里是模拟从数据库中接收学生的数据结构
const students = [
        {
          name: "雄子涵",
          class: 1,
          classPerformance: 90,
          defense: 78,
          finalExam: 60,
        },
        {
          name: "羊俞杰",
          class: 1,
          classPerformance: 90,
          defense: 77,
          finalExam: 70,
        },
        {
          name: "唐小鱼",
          class: 1,
          classPerformance: 140,
          defense: 90,
          finalExam: 0,
        },
        {
          name: "灭霸",
          class: 3,
          classPerformance: 14,
          defense: 90,
          finalExam: 12,
        },
        {
          name: "张喆",
          class: 3,
          classPerformance: 11,
          defense: 60,
          finalExam: 12,
        },
        {
          name: "依林",
          class: 1,
          classPerformance: 100,
          defense: 60,
          finalExam: 82,
        },
        {
          name: "雨豪",
          class: 1,
          classPerformance: 88,
          defense: 70,
          finalExam: 100,
        },
        {
          name: "苏悠玲",
          class: 2,
          classPerformance: 100,
          defense: 100,
          finalExam: 100,
        },
        {
          name: "童莫玲",
          class: 2,
          classPerformance: 90,
          defense: 90,
          finalExam: 78,
        },
        {
          name: "李希",
          class: 2,
          classPerformance: 100,
          defense: 90,
          finalExam: 77,
        },
        {
          name: "擎苍",
          class: 3,
          classPerformance: 100,
          defense: 98,
          finalExam: 87,
        },
        {
          name: "苗孟",
          class: 2,
          classPerformance: 100,
          defense: 99,
          finalExam: 77,
        },
        {
          name: "皓轩",
          class: 3,
          classPerformance: 100,
          defense: 87,
          finalExam: 78,
        },
        {
          name: "风川祥",
          class: 2,
          classPerformance: 100,
          defense: 76,
          finalExam: 86,
        },
        {
          name: "潇萧然",
          class: 3,
          classPerformance: 99,
          defense: 67,
          finalExam: 84,
        },
        {
          name: "智宸",
          class: 1,
          classPerformance: 80,
          defense: 54,
          finalExam: 100,
        },
        {
          name: "风华",
          class: 3,
          classPerformance: 10,
          defense: 90,
          finalExam: 40,
        },
        {
          name: "紫昆",
          class: 1,
          classPerformance: 90,
          defense: 68,
          finalExam: 75,
        },
        {
          name: "齐涵雅",
          class: 2,
          classPerformance: 100,
          defense: 100,
          finalExam: 100,
        },
        {
          name: "初尹伟",
          class: 3,
          classPerformance: 100,
          defense: 90,
          finalExam: 100,
        },
];
//这一步是将结果转化为表格
const result = orderStudentGrade(students);
const style = document.createElement('style');
//这里是给表格添加样式。正式开发不推荐这么写，略过
style.textContent = `
  .cls {
    margin-bottom: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  
  .cls-header {
    background: #3498db;
    color: white;
    padding: 12px 15px;
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .score-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .score-table th {
    background-color: #2c3e50;
    color: white;
    padding: 12px 10px;
    text-align: center;
  }
  
  .score-table td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  
  .score-table tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .score-table tr:hover {
    background-color: #e9f7fe;
    transition: background-color 0.3s;
  }
  
  .score-table td:first-child {
    font-weight: 500;
  }
  
  .score-table td:last-child {
    font-weight: bold;
    color: #2c3e50;
  }
`;
document.head.appendChild(style);
//试着把这个构建表格的过程读明白！思考一下orderStudentGrade函数应该返回什么内容？
Object.keys(result).forEach((cls) => {
    const clsContainer = document.createElement("div");
    clsContainer.className = "cls";//类名称

    const clsHeader = document.createElement("div");
    clsHeader.className = "cls-header";
    clsHeader.innerText = `第${cls}小组`;
    clsContainer.appendChild(clsHeader);

    const table = document.createElement("table");
    table.border = 1;
    table.align = "center";
    table.width = "100%";

    const header = document.createElement("tr");

    const th1 = document.createElement("th");
    th1.innerText = "姓名";
    header.appendChild(th1);

    const th2 = document.createElement("th");
    th2.innerText = "课堂表现";
    header.appendChild(th2);

    const th3 = document.createElement("th");
    th3.innerText = "答辩表现";
    header.appendChild(th3);

    const th4 = document.createElement("th");
    th4.innerText = "期末成绩";
    header.appendChild(th4);

    const th5 = document.createElement("th");
    th5.innerText = "总分";
    header.appendChild(th5);

    table.appendChild(header);

    const students = result[cls];

    students.forEach((student) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.innerText = student.name;
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.innerText = student.defense;
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.innerText = student.classPerformance;
        tr.appendChild(td3);

        const td4 = document.createElement("td");
        td4.innerText = student.finalExam;
        tr.appendChild(td4);

        const td5 = document.createElement("td");
        td5.innerText =
            student.classPerformance +
            student.defense +
            student.finalExam;
        tr.appendChild(td5);

        table.appendChild(tr);
    });

    clsContainer.appendChild(table);
    output.appendChild(clsContainer);
});