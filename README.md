# IoT Cihaz Yönetim ve Sensör Veri İzleme Sistemi

## 1. Amaç

Bu sistemin amacı, tarım sektöründeki kullanıcı gruplarına IoT cihazlarının uzaktan yönetimi ve sensör verilerinin izlenmesi imkânı sunmaktır. Çiftçiler, teknikerler veya endüstriyel kullanıcılar, sisteme ekledikleri cihazları yönetebilecek, cihazlara komutlar verebilecek ve bu komutları belirli zamanlarda otomatik olarak çalışacak şekilde zamanlayabilecektir. Ayrıca, kullanıcı yönetimi özellikleri ile yöneticiler diğer kullanıcı ayarlarına erişim sağlayabilecektir. Sistem, **PostgreSQL** veri tabanıyla desteklenen bir web uygulaması olarak geliştirilmiştir.

## 2. Hedefler

Bu proje, farklı IoT cihazlarını ve sensörlerini yönetmeyi amaçlamaktadır. Sistemin hedefleri şunlardır:

1. Yetkili kullanıcılar tarafından cihaz ekleme ve silme işlemlerinin gerçekleştirilmesi.
2. Yetkili kullanıcılar tarafından sistem kullanıcı yönetiminin sağlanması.
3. Cihazlara uzaktan komut gönderme ve sensör verilerinin depolanma işlemlerini gerçekleştirmek.
4. Toplanan verileri işlemeye uygun formatta kaydedip raporlama işlevlerini yerine getirmek.
5. Cihaz verilerinin yüksek hızda işlenmesi ve uzun süreli verilerin güvenli bir şekilde depolanmasını sağlamak.
6. Kullanıcıların takvim üzerinden cihaz komutlarını zamanlayabilmesi, belirli tarih ve saatlerde komutları otomatik olarak çalıştırabilmesi.
7. Kullanıcı dostu bir arayüze sahip olmak.

## 3. Kullanılan Teknolojiler

Projede kullanılan başlıca teknolojiler şunlardır:

- **PostgreSQL**: IoT cihazları, kullanıcılar, sensör verileri ve logların depolanması sağlanmıştır.
- **Hibernate**: ORM (Object-Relational Mapping) aracı olarak Hibernate framework'ü kullanılmış ve veritabanı işlemleri optimize edilmiştir.
- **Java Spring Boot**: RESTful API'lerin geliştirilmesi sağlanmış ve kullanıcı yönetimi, cihaz yönetimi, veri toplama ve raporlama işlemleri için gerekli backend yapılar oluşturulmuştur.
- **React**: IoT cihazlarının yönetimi ve sensör verilerinin izlenmesi sağlanmıştır.
- **Firebase Authentication**: Kullanıcıların farklı kimlik doğrulama yöntemleriyle (e-posta ve şifre, telefon numarası, sosyal medya hesapları gibi) güvenli bir şekilde oturum açması sağlanmıştır.
- **Visual Studio Code IDE**: Geliştirme sürecinde kullanılan temel bir kod editörü olarak tercih edilmiştir.
- **Visual Paradigm**: ER diyagramlarının oluşturulmasında kullanılmıştır.
- **GitHub**: Versiyon kontrol sistemi olarak kullanılmış ve proje üzerindeki işbirliği, kaynak kontrolü, kod yönetimi ve paylaşımı sağlanmıştır.
- **Jira**: Proje yönetimi ve takip işlemleri için kullanılmıştır.

## 4. Kurulum

Projeyi çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. Bu repository'yi klonlayın:
   ```bash
   git clone https://github.com/kullanici-adi/repo-adi.git
   cd repo-adi
