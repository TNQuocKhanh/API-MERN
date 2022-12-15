# Project: HDK-GreenMarket, phần Back-end
Trường Đại học Sư phạm Kỹ thuật Thành phố Hồ Chí Minh </br>
Tiểu luận chuyên ngành </br>
GVHD: Hoàng Văn Dũng </br>
Thực hiện: Nhóm 4 </br>
Thành viên:
1. Trần Nguyễn Quốc Khánh  19110227 
2. Nguyễn Kỳ Hải           19110197
3. Diệp Thái Dương         19110009
## Link project: https://green-market-hdk-izrrhd2plq-uc.a.run.app 
### Link báo cáo: https://drive.google.com/file/d/1LFgLfj8bnBaEsSn88rnBH2ZgN1oJP6mC/view?usp=sharing

Project được xây dựng bằng công nghệ MERN (MongoDB, Express, ReactJS và NodeJS) được deploy bằng Google Cloud Run bằng cách sử dụng Docker image.\
Link backend: https://github.com/TNQuocKhanh/API-MERN .\
Link front-end: https://github.com/DiepThaiDuong-19110009/frontend-TLCN .

# Triển khai ứng dụng trên Google Cloud Platform
Build image bằng Dockerfile --> Push image to Google Container Registry --> Deploy to Google CLoud Run .\
Link back-end: https://green-node-app-izrrhd2plq-uc.a.run.app/api/product .\
Link project sau khi deploy: https://green-market-hdk-izrrhd2plq-uc.a.run.app 

# Hướng dẫn cách khởi chạy dự án
> Cài đặt IDE Visual Studio Code, Git, NodeJS, npm (hoặc yarn) 
  * Chọn thư mục cần chạy dự án, cmd vào thư mục đó
  * Chạy lệnh: `git clone https://github.com/TNQuocKhanh/API-MERN.git` với back-end </br>
  * Chạy lệnh: `npm install` (nếu lỗi do xung đột phiên bản thì chạy lệnh: `npm install --force`)
  * Chạy lệnh: `npm start` để chạy dự án 
