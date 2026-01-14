export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'nl' | 'vi' | 'th' | 'id';

export interface Translations {
  welcome: {
    title: string;
    subtitle: string;
    startButton: string;
  };
  conversation: {
    welcome: string;
    startOptions: string[];
    reminderPrompt: string;
    reminderOptions: string[];
    country: string;
    companyName: string;
    companyNameEn: string;
    registrationNumber: string;
    addressLocal: string;
    addressEn: string;
    entityRole: string;
    entityRoleOptions: string[];
    companyInfoReceived: string;
    continue: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    language: string;
    languageOptions: string[];
    password: string;
    confirmPassword: string;
    validating: string;
    validationComplete: string;
  };
  ui: {
    step: string;
    edit: string;
    send: string;
    placeholder: string;
    confirm: string;
    successTitle: string;
    successMessage: string;
    desktopLogin: string;
    continueWeChat: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    welcome: {
      title: 'Welcome to Flexport Supplier Onboarding Assistant',
      subtitle: 'I will guide you through the account registration\nand information verification process\nThe entire flow should take approximately 2 minutes',
      startButton: '【Start Registration】',
    },
    conversation: {
      welcome: 'Hello 👋\nWelcome to the Flexport Supplier Onboarding Assistant. I will guide you through the account registration and information verification process. The entire flow should take approximately 2 minutes.\nWould you like to start the registration process now?',
      startOptions: ['Yes', 'No'],
      reminderPrompt: 'Would you like me to send you a reminder to complete the registration later?',
      reminderOptions: ['Yes, send reminder', 'No, thank you'],
      country: 'Please tell me the country/region where your company is located.',
      companyName: 'Please enter your company name in the local language (must match the business license).',
      companyNameEn: 'The following English company name has been automatically generated based on the invitation data (this field is editable and is used for company entity validation):',
      registrationNumber: 'Please provide your Business Registration Number.',
      addressLocal: 'Please enter the registered address as it appears on your business license (in the local language).',
      addressEn: 'Please enter the registered address (English).',
      entityRole: 'Please select your company\'s role in the supply chain:\nThis role will appear on the HBL/Billing documents.',
      entityRoleOptions: ['Consignee', 'Shipper'],
      companyInfoReceived: '✔ We have successfully received your company information\nNow, let\'s proceed to complete your primary contact details.\nContinue?',
      continue: 'Continue',
      firstName: 'Please confirm or modify your First Name:',
      lastName: 'Please confirm or modify your Last Name:',
      email: 'Please confirm or modify your email address:\nThis email will be used for Flexport system notifications.',
      phone: 'Please enter your phone number (used for order and operations notifications).',
      language: 'Please select your preferred language:\nThe system has pre-selected: English',
      languageOptions: ['English', '简体中文'],
      password: 'Please set up your account password:\nPassword must be at least 8 characters.\nMust include letters and numbers.\nPlease enter your password.',
      confirmPassword: 'Please re-enter your password for confirmation.',
      validating: '🔍 Validating your information...',
      validationComplete: '✔ Information confirmed\n✔ No duplicate company conflicts found\n✔ Contact details are valid',
    },
    ui: {
      step: 'Step',
      edit: 'Edit',
      send: 'Send',
      placeholder: 'Type a message...',
      confirm: 'Confirm',
      successTitle: 'Registration Complete!',
      successMessage: 'Your Flexport account is now active.',
      desktopLogin: '【Log in on Desktop】',
      continueWeChat: '【Continue in WeChat Agent】',
    },
  },
  'zh-CN': {
    welcome: {
      title: '欢迎使用 Flexport 供应商入驻助手',
      subtitle: '我将引导您完成账户注册\n和信息验证流程\n整个过程大约需要 2 分钟',
      startButton: '【开始入驻】',
    },
    conversation: {
      welcome: '你好 👋\n欢迎使用 Flexport 供应商入驻助手。我将引导您完成账户注册和信息验证流程。整个过程大约需要 2 分钟。\n您是否希望现在开始注册流程？',
      startOptions: ['是', '否'],
      reminderPrompt: '您希望我稍后发送提醒来完成注册吗？',
      reminderOptions: ['是，发送提醒', '否，谢谢'],
      country: '请告诉我贵公司所在的国家/地区。',
      companyName: '请输入贵公司的中文名称（必须与营业执照一致）。',
      companyNameEn: '以下英文公司名称已根据邀请数据自动生成（此字段可编辑，用于公司实体验证）：',
      registrationNumber: '请提供您的营业执照注册号。',
      addressLocal: '请输入营业执照上的注册地址（使用本地语言）。',
      addressEn: '请输入注册地址（英文）。',
      entityRole: '请选择贵公司在供应链中的角色：\n此角色将出现在 HBL/账单文件上。',
      entityRoleOptions: ['收货人', '发货人'],
      companyInfoReceived: '✔ 我们已成功收到您的公司信息\n现在，让我们继续完成您的主要联系方式。\n继续吗？',
      continue: '继续',
      firstName: '请确认或修改您的名字：',
      lastName: '请确认或修改您的姓氏：',
      email: '请确认或修改您的电子邮件地址：\n此电子邮件将用于 Flexport 系统通知。',
      phone: '请输入您的电话号码（用于订单和运营通知）。',
      language: '请选择您的首选语言：\n系统已预选：简体中文',
      languageOptions: ['简体中文', 'English'],
      password: '请设置您的账户密码：\n密码必须至少 8 个字符。\n必须包含字母和数字。\n请输入您的密码。',
      confirmPassword: '请再次输入密码以确认。',
      validating: '🔍 正在验证您的信息...',
      validationComplete: '✔ 信息已确认\n✔ 未发现重复公司冲突\n✔ 联系方式有效',
    },
    ui: {
      step: '步骤',
      edit: '编辑',
      send: '发送',
      placeholder: '输入消息...',
      confirm: '确认',
      successTitle: '入驻完成！',
      successMessage: '您的账号已创建。',
      desktopLogin: '【前往电脑登录】',
      continueWeChat: '【继续在微信使用 Flexport】',
    },
  },
  'zh-TW': {
    welcome: {
      title: '歡迎使用 Flexport 供應商入駐助手',
      subtitle: '我將引導您完成帳戶註冊\n和資訊驗證流程\n整個過程大約需要 2 分鐘',
      startButton: '【開始入駐】',
    },
    conversation: {
      welcome: '你好 👋\n歡迎使用 Flexport 供應商入駐助手。我將引導您完成帳戶註冊和資訊驗證流程。整個過程大約需要 2 分鐘。\n您是否希望現在開始註冊流程？',
      startOptions: ['是', '否'],
      reminderPrompt: '您希望我稍後發送提醒來完成註冊嗎？',
      reminderOptions: ['是，發送提醒', '否，謝謝'],
      country: '請告訴我貴公司所在的國家/地區。',
      companyName: '請輸入貴公司的中文名稱（必須與營業執照一致）。',
      companyNameEn: '以下英文公司名稱已根據邀請資料自動生成（此欄位可編輯，用於公司實體驗證）：',
      registrationNumber: '請提供您的營業執照註冊號。',
      addressLocal: '請輸入營業執照上的註冊地址（使用本地語言）。',
      addressEn: '請輸入註冊地址（英文）。',
      entityRole: '請選擇貴公司在供應鏈中的角色：\n此角色將出現在 HBL/帳單文件上。',
      entityRoleOptions: ['收貨人', '發貨人'],
      companyInfoReceived: '✔ 我們已成功收到您的公司資訊\n現在，讓我們繼續完成您的主要聯絡方式。\n繼續嗎？',
      continue: '繼續',
      firstName: '請確認或修改您的名字：',
      lastName: '請確認或修改您的姓氏：',
      email: '請確認或修改您的電子郵件地址：\n此電子郵件將用於 Flexport 系統通知。',
      phone: '請輸入您的電話號碼（用於訂單和營運通知）。',
      language: '請選擇您的首選語言：\n系統已預選：繁體中文',
      languageOptions: ['繁體中文', 'English'],
      password: '請設置您的帳戶密碼：\n密碼必須至少 8 個字元。\n必須包含字母和數字。\n請輸入您的密碼。',
      confirmPassword: '請再次輸入密碼以確認。',
      validating: '🔍 正在驗證您的資訊...',
      validationComplete: '✔ 資訊已確認\n✔ 未發現重複公司衝突\n✔ 聯絡方式有效',
    },
    ui: {
      step: '步驟',
      edit: '編輯',
      send: '發送',
      placeholder: '輸入訊息...',
      confirm: '確認',
      successTitle: '入駐完成！',
      successMessage: '您的帳號已創建。',
      desktopLogin: '【前往電腦登入】',
      continueWeChat: '【繼續在微信使用 Flexport】',
    },
  },
  nl: {
    welcome: {
      title: 'Welkom bij Flexport Supplier Onboarding Assistant',
      subtitle: 'Ik zal u begeleiden bij de accountregistratie\nen informatieverificatie\nHet hele proces duurt ongeveer 2 minuten',
      startButton: '【Start Registratie】',
    },
    conversation: {
      welcome: 'Hallo 👋\nWelkom bij de Flexport Supplier Onboarding Assistant. Ik zal u begeleiden bij het accountregistratie- en informatieverificatieproces. Het hele proces duurt ongeveer 2 minuten.\nWilt u nu beginnen met het registratieproces?',
      startOptions: ['Ja', 'Nee'],
      reminderPrompt: 'Zou u willen dat ik u later een herinnering stuur om de registratie te voltooien?',
      reminderOptions: ['Ja, stuur herinnering', 'Nee, bedankt'],
      country: 'Vertel me alstublieft in welk land/regio uw bedrijf zich bevindt.',
      companyName: 'Voer alstublieft de naam van uw bedrijf in de lokale taal in (moet overeenkomen met het handelsregister).',
      companyNameEn: 'De volgende Engelse bedrijfsnaam is automatisch gegenereerd op basis van de uitnodigingsgegevens (dit veld is bewerkbaar en wordt gebruikt voor bedrijfsentiteitsvalidatie):',
      registrationNumber: 'Geef alstublieft uw Handelsregisternummer op.',
      addressLocal: 'Voer alstublieft het geregistreerde adres in zoals het op uw handelsregister staat (in de lokale taal).',
      addressEn: 'Voer alstublieft het geregistreerde adres in (Engels).',
      entityRole: 'Selecteer alstublieft de rol van uw bedrijf in de supply chain:\nDeze rol verschijnt op de HBL/Factuurdocumenten.',
      entityRoleOptions: ['Geadresseerde', 'Verzender'],
      companyInfoReceived: '✔ We hebben uw bedrijfsinformatie succesvol ontvangen\nLaten we nu doorgaan met het invullen van uw primaire contactgegevens.\nDoorgaan?',
      continue: 'Doorgaan',
      firstName: 'Bevestig of wijzig alstublieft uw voornaam:',
      lastName: 'Bevestig of wijzig alstublieft uw achternaam:',
      email: 'Bevestig of wijzig alstublieft uw e-mailadres:\nDit e-mailadres wordt gebruikt voor Flexport systeemmeldingen.',
      phone: 'Voer alstublieft uw telefoonnummer in (gebruikt voor bestel- en operationele meldingen).',
      language: 'Selecteer alstublieft uw voorkeurstaal:\nHet systeem heeft standaard geselecteerd: Nederlands',
      languageOptions: ['Nederlands', 'English'],
      password: 'Stel alstublieft uw accountwachtwoord in:\nWachtwoord moet minimaal 8 tekens lang zijn.\nMoet letters en cijfers bevatten.\nVoer alstublieft uw wachtwoord in.',
      confirmPassword: 'Voer alstublieft uw wachtwoord opnieuw in ter bevestiging.',
      validating: '🔍 Uw informatie valideren...',
      validationComplete: '✔ Informatie bevestigd\n✔ Geen dubbele bedrijfsconflicten gevonden\n✔ Contactgegevens zijn geldig',
    },
    ui: {
      step: 'Stap',
      edit: 'Bewerken',
      send: 'Verzenden',
      placeholder: 'Typ een bericht...',
      confirm: 'Bevestigen',
      successTitle: 'Registratie Voltooid!',
      successMessage: 'Uw Flexport-account is nu actief.',
      desktopLogin: '【Inloggen op Desktop】',
      continueWeChat: '【Doorgaan in WeChat Agent】',
    },
  },
  vi: {
    welcome: {
      title: 'Chào mừng đến với Trợ lý Đăng ký Nhà cung cấp Flexport',
      subtitle: 'Tôi sẽ hướng dẫn bạn qua quy trình đăng ký tài khoản\nvà xác minh thông tin\nToàn bộ quy trình sẽ mất khoảng 2 phút',
      startButton: '【Bắt đầu Đăng ký】',
    },
    conversation: {
      welcome: 'Xin chào 👋\nChào mừng đến với Trợ lý Đăng ký Nhà cung cấp Flexport. Tôi sẽ hướng dẫn bạn qua quy trình đăng ký tài khoản và xác minh thông tin. Toàn bộ quy trình sẽ mất khoảng 2 phút.\nBạn có muốn bắt đầu quy trình đăng ký ngay bây giờ không?',
      startOptions: ['Có', 'Không'],
      reminderPrompt: 'Bạn có muốn tôi gửi cho bạn lời nhắc để hoàn tất đăng ký sau không?',
      reminderOptions: ['Có, gửi lời nhắc', 'Không, cảm ơn'],
      country: 'Vui lòng cho tôi biết quốc gia/khu vực nơi công ty của bạn đặt trụ sở.',
      companyName: 'Vui lòng nhập tên công ty của bạn bằng ngôn ngữ địa phương (phải khớp với giấy phép kinh doanh).',
      companyNameEn: 'Tên công ty tiếng Anh sau đây đã được tự động tạo dựa trên dữ liệu lời mời (trường này có thể chỉnh sửa và được sử dụng để xác thực thực thể công ty):',
      registrationNumber: 'Vui lòng cung cấp Số Đăng ký Kinh doanh của bạn.',
      addressLocal: 'Vui lòng nhập địa chỉ đăng ký như trên giấy phép kinh doanh của bạn (bằng ngôn ngữ địa phương).',
      addressEn: 'Vui lòng nhập địa chỉ đăng ký (tiếng Anh).',
      entityRole: 'Vui lòng chọn vai trò của công ty bạn trong chuỗi cung ứng:\nVai trò này sẽ xuất hiện trên các tài liệu HBL/Hóa đơn.',
      entityRoleOptions: ['Người nhận hàng', 'Người gửi hàng'],
      companyInfoReceived: '✔ Chúng tôi đã nhận thành công thông tin công ty của bạn\nBây giờ, hãy tiếp tục hoàn thành thông tin liên hệ chính của bạn.\nTiếp tục?',
      continue: 'Tiếp tục',
      firstName: 'Vui lòng xác nhận hoặc sửa đổi Tên của bạn:',
      lastName: 'Vui lòng xác nhận hoặc sửa đổi Họ của bạn:',
      email: 'Vui lòng xác nhận hoặc sửa đổi địa chỉ email của bạn:\nEmail này sẽ được sử dụng cho thông báo hệ thống Flexport.',
      phone: 'Vui lòng nhập số điện thoại của bạn (được sử dụng cho thông báo đơn hàng và hoạt động).',
      language: 'Vui lòng chọn ngôn ngữ ưa thích của bạn:\nHệ thống đã chọn trước: Tiếng Việt',
      languageOptions: ['Tiếng Việt', 'English'],
      password: 'Vui lòng thiết lập mật khẩu tài khoản của bạn:\nMật khẩu phải có ít nhất 8 ký tự.\nPhải bao gồm chữ cái và số.\nVui lòng nhập mật khẩu của bạn.',
      confirmPassword: 'Vui lòng nhập lại mật khẩu để xác nhận.',
      validating: '🔍 Đang xác minh thông tin của bạn...',
      validationComplete: '✔ Thông tin đã được xác nhận\n✔ Không tìm thấy xung đột công ty trùng lặp\n✔ Thông tin liên hệ hợp lệ',
    },
    ui: {
      step: 'Bước',
      edit: 'Chỉnh sửa',
      send: 'Gửi',
      placeholder: 'Nhập tin nhắn...',
      confirm: 'Xác nhận',
      successTitle: 'Đăng ký Hoàn tất!',
      successMessage: 'Tài khoản Flexport của bạn hiện đã được kích hoạt.',
      desktopLogin: '【Đăng nhập trên Máy tính】',
      continueWeChat: '【Tiếp tục trong WeChat Agent】',
    },
  },
  th: {
    welcome: {
      title: 'ยินดีต้อนรับสู่ผู้ช่วยการลงทะเบียนซัพพลายเออร์ Flexport',
      subtitle: 'ฉันจะแนะนำคุณผ่านกระบวนการลงทะเบียนบัญชี\nและการยืนยันข้อมูล\nกระบวนการทั้งหมดจะใช้เวลาประมาณ 2 นาที',
      startButton: '【เริ่มการลงทะเบียน】',
    },
    conversation: {
      welcome: 'สวัสดี 👋\nยินดีต้อนรับสู่ผู้ช่วยการลงทะเบียนซัพพลายเออร์ Flexport ฉันจะแนะนำคุณผ่านกระบวนการลงทะเบียนบัญชีและการยืนยันข้อมูล กระบวนการทั้งหมดจะใช้เวลาประมาณ 2 นาที\nคุณต้องการเริ่มกระบวนการลงทะเบียนตอนนี้หรือไม่?',
      startOptions: ['ใช่', 'ไม่'],
      reminderPrompt: 'คุณต้องการให้ฉันส่งการแจ้งเตือนให้คุณเพื่อทำการลงทะเบียนในภายหลังหรือไม่?',
      reminderOptions: ['ใช่ ส่งการแจ้งเตือน', 'ไม่ ขอบคุณ'],
      country: 'กรุณาบอกฉันว่าบริษัทของคุณตั้งอยู่ในประเทศ/ภูมิภาคใด',
      companyName: 'กรุณากรอกชื่อบริษัทของคุณเป็นภาษาท้องถิ่น (ต้องตรงกับใบอนุญาตประกอบธุรกิจ)',
      companyNameEn: 'ชื่อบริษัทภาษาอังกฤษต่อไปนี้ถูกสร้างขึ้นโดยอัตโนมัติตามข้อมูลคำเชิญ (ฟิลด์นี้สามารถแก้ไขได้และใช้สำหรับการตรวจสอบนิติบุคคลของบริษัท):',
      registrationNumber: 'กรุณาระบุหมายเลขทะเบียนธุรกิจของคุณ',
      addressLocal: 'กรุณากรอกที่อยู่ที่จดทะเบียนตามที่ปรากฏในใบอนุญาตประกอบธุรกิจของคุณ (เป็นภาษาท้องถิ่น)',
      addressEn: 'กรุณากรอกที่อยู่ที่จดทะเบียน (ภาษาอังกฤษ)',
      entityRole: 'กรุณาเลือกบทบาทของบริษัทของคุณในห่วงโซ่อุปทาน:\nบทบาทนี้จะปรากฏบนเอกสาร HBL/ใบเรียกเก็บเงิน',
      entityRoleOptions: ['ผู้รับสินค้า', 'ผู้ส่งสินค้า'],
      companyInfoReceived: '✔ เราได้รับข้อมูลบริษัทของคุณเรียบร้อยแล้ว\nตอนนี้ ให้ดำเนินการต่อเพื่อกรอกข้อมูลติดต่อหลักของคุณ\nดำเนินการต่อหรือไม่?',
      continue: 'ดำเนินการต่อ',
      firstName: 'กรุณายืนยันหรือแก้ไขชื่อของคุณ:',
      lastName: 'กรุณายืนยันหรือแก้ไขนามสกุลของคุณ:',
      email: 'กรุณายืนยันหรือแก้ไขที่อยู่อีเมลของคุณ:\nอีเมลนี้จะใช้สำหรับการแจ้งเตือนระบบ Flexport',
      phone: 'กรุณากรอกหมายเลขโทรศัพท์ของคุณ (ใช้สำหรับการแจ้งเตือนคำสั่งซื้อและการดำเนินงาน)',
      language: 'กรุณาเลือกภาษาที่คุณต้องการ:\nระบบได้เลือกไว้ล่วงหน้า: ไทย',
      languageOptions: ['ไทย', 'English'],
      password: 'กรุณาตั้งรหัสผ่านบัญชีของคุณ:\nรหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร\nต้องรวมตัวอักษรและตัวเลข\nกรุณากรอกรหัสผ่านของคุณ',
      confirmPassword: 'กรุณากรอกรหัสผ่านอีกครั้งเพื่อยืนยัน',
      validating: '🔍 กำลังตรวจสอบข้อมูลของคุณ...',
      validationComplete: '✔ ยืนยันข้อมูลแล้ว\n✔ ไม่พบความขัดแย้งของบริษัทซ้ำ\n✔ ข้อมูลติดต่อถูกต้อง',
    },
    ui: {
      step: 'ขั้นตอน',
      edit: 'แก้ไข',
      send: 'ส่ง',
      placeholder: 'พิมพ์ข้อความ...',
      confirm: 'ยืนยัน',
      successTitle: 'การลงทะเบียนเสร็จสมบูรณ์!',
      successMessage: 'บัญชี Flexport ของคุณพร้อมใช้งานแล้ว',
      desktopLogin: '【เข้าสู่ระบบบนเดสก์ท็อป】',
      continueWeChat: '【ดำเนินการต่อใน WeChat Agent】',
    },
  },
  id: {
    welcome: {
      title: 'Selamat Datang di Asisten Pendaftaran Supplier Flexport',
      subtitle: 'Saya akan memandu Anda melalui proses pendaftaran akun\ndan verifikasi informasi\nSeluruh proses akan memakan waktu sekitar 2 menit',
      startButton: '【Mulai Pendaftaran】',
    },
    conversation: {
      welcome: 'Halo 👋\nSelamat Datang di Asisten Pendaftaran Supplier Flexport. Saya akan memandu Anda melalui proses pendaftaran akun dan verifikasi informasi. Seluruh proses akan memakan waktu sekitar 2 menit.\nApakah Anda ingin memulai proses pendaftaran sekarang?',
      startOptions: ['Ya', 'Tidak'],
      reminderPrompt: 'Apakah Anda ingin saya mengirimkan pengingat untuk menyelesaikan pendaftaran nanti?',
      reminderOptions: ['Ya, kirim pengingat', 'Tidak, terima kasih'],
      country: 'Tolong beri tahu saya negara/wilayah tempat perusahaan Anda berada.',
      companyName: 'Silakan masukkan nama perusahaan Anda dalam bahasa lokal (harus sesuai dengan izin usaha).',
      companyNameEn: 'Nama perusahaan bahasa Inggris berikut telah dibuat secara otomatis berdasarkan data undangan (field ini dapat diedit dan digunakan untuk validasi entitas perusahaan):',
      registrationNumber: 'Silakan berikan Nomor Registrasi Bisnis Anda.',
      addressLocal: 'Silakan masukkan alamat terdaftar seperti yang tertera pada izin usaha Anda (dalam bahasa lokal).',
      addressEn: 'Silakan masukkan alamat terdaftar (bahasa Inggris).',
      entityRole: 'Silakan pilih peran perusahaan Anda dalam rantai pasokan:\nPeran ini akan muncul pada dokumen HBL/Faktur.',
      entityRoleOptions: ['Penerima', 'Pengirim'],
      companyInfoReceived: '✔ Kami telah berhasil menerima informasi perusahaan Anda\nSekarang, mari kita lanjutkan untuk melengkapi detail kontak utama Anda.\nLanjutkan?',
      continue: 'Lanjutkan',
      firstName: 'Silakan konfirmasi atau modifikasi Nama Depan Anda:',
      lastName: 'Silakan konfirmasi atau modifikasi Nama Belakang Anda:',
      email: 'Silakan konfirmasi atau modifikasi alamat email Anda:\nEmail ini akan digunakan untuk notifikasi sistem Flexport.',
      phone: 'Silakan masukkan nomor telepon Anda (digunakan untuk notifikasi pesanan dan operasi).',
      language: 'Silakan pilih bahasa pilihan Anda:\nSistem telah memilih sebelumnya: Bahasa Indonesia',
      languageOptions: ['Bahasa Indonesia', 'English'],
      password: 'Silakan atur kata sandi akun Anda:\nKata sandi harus minimal 8 karakter.\nHarus mencakup huruf dan angka.\nSilakan masukkan kata sandi Anda.',
      confirmPassword: 'Silakan masukkan kembali kata sandi Anda untuk konfirmasi.',
      validating: '🔍 Memvalidasi informasi Anda...',
      validationComplete: '✔ Informasi dikonfirmasi\n✔ Tidak ditemukan konflik perusahaan duplikat\n✔ Detail kontak valid',
    },
    ui: {
      step: 'Langkah',
      edit: 'Edit',
      send: 'Kirim',
      placeholder: 'Ketik pesan...',
      confirm: 'Konfirmasi',
      successTitle: 'Pendaftaran Selesai!',
      successMessage: 'Akun Flexport Anda sekarang aktif.',
      desktopLogin: '【Masuk di Desktop】',
      continueWeChat: '【Lanjutkan di WeChat Agent】',
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  nl: 'Nederlands',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
};

