Insert Into departments (department)
values ("Big Boss"),
("Middle People"),
("Small Worthless Scum"),
("Slaves");

Insert Into roles (roles, salary, deparment_id) 
values ("Worker", 400.82, 3),
("Slave", 0, 4),
("Middle", 800.21, 2),
("Big Ones", 20,000.43, 1);

Insert Into employees(first_name, last_name, role_id, manager_id)
values ("Clark", "Sad", 1, 1),
("Blart", "Trog", 2, 2),
("Cleag", "Land", 3, 3),
("Borm", "Barm", 4, 4);
