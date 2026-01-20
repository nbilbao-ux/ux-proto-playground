// ============================================================================
// Translations for Supplier Onboarding Flow
// ============================================================================

export interface OnboardingTranslations {
  // Step labels
  stepProfile: string;
  stepCompany: string;
  stepComplete: string;

  // Profile step
  createYourAccount: string;
  setupPersonalProfile: string;
  joiningToConnect: string;
  asSupplier: string;
  firstName: string;
  lastName: string;
  enterFirstName: string;
  enterLastName: string;
  email: string;
  emailPlaceholder: string;
  phoneNumber: string;
  phonePlaceholder: string;
  preferredLanguage: string;
  jobTitle: string;
  enterJobTitle: string;
  security: string;
  password: string;
  createPassword: string;
  confirmPassword: string;
  confirmYourPassword: string;
  passwordStrength: string;
  passwordHint: string;
  weak: string;
  medium: string;
  strong: string;
  back: string;
  continue: string;

  // Validation errors
  firstNameRequired: string;
  lastNameRequired: string;
  emailRequired: string;
  invalidEmail: string;
  phoneRequired: string;
  invalidPhone: string;
  preferredLanguageRequired: string;
  jobTitleRequired: string;
  passwordRequired: string;
  confirmPasswordRequired: string;
  passwordsDoNotMatch: string;
  passwordMinChars: string;
  passwordUppercase: string;
  passwordSymbol: string;

  // Company step
  companyInformation: string;
  enterCompanyDetails: string;
  companyName: string;
  enterCompanyName: string;
  localCompanyName: string;
  enterLocalCompanyName: string;
  businessRegistrationNumber: string;
  enterBusinessRegNumber: string;
  streetAddress1: string;
  enterStreetAddress1: string;
  streetAddress2: string;
  enterStreetAddress2: string;
  city: string;
  enterCity: string;
  stateProvince: string;
  enterStateProvince: string;
  postalCode: string;
  enterPostalCode: string;
  countryRegion: string;
  selectCountry: string;
  defaultLanguage: string;
  basedOnAddress: string;
  defaultTimezone: string;
  selectTimezone: string;
  primaryContact: string;
  emailAddress: string;
  contactEmailPlaceholder: string;
  relationshipWith: string;
  relationshipDescription: string;
  completeSetup: string;

  // Company validation errors
  companyNameRequired: string;
  streetAddress1Required: string;
  cityRequired: string;
  countryRequired: string;
  companyPhoneRequired: string;
  defaultLanguageRequired: string;
  primaryEmailRequired: string;
  timezoneRequired: string;
  businessRegRequired: string;
  relationshipRequired: string;

  // Duplicate detection
  accountExists: string;
  accountExistsDescription: string;
  loginAndConnect: string;
  useDifferentEmail: string;

  // Success
  allSet: string;
  congratulations: string;
  clientConsignee: string;
  connected: string;
  redirectNotice: string;
}

export const translations: Record<string, OnboardingTranslations> = {
  en: {
    // Step labels
    stepProfile: 'Profile',
    stepCompany: 'Company',
    stepComplete: 'Complete',

    // Profile step
    createYourAccount: 'Create Your Account',
    setupPersonalProfile: 'Set up your personal profile to get started',
    joiningToConnect: 'You are joining Flexport to connect with',
    asSupplier: 'as a Supplier.',
    firstName: 'First Name',
    lastName: 'Last Name',
    enterFirstName: 'Enter first name',
    enterLastName: 'Enter last name',
    email: 'Email',
    emailPlaceholder: 'email@company.com',
    phoneNumber: 'Phone Number',
    phonePlaceholder: '+86 123 4567 8900',
    preferredLanguage: 'Preferred Language',
    jobTitle: 'Job Title',
    enterJobTitle: 'Enter your job title',
    security: 'Security',
    password: 'Password',
    createPassword: 'Create a password',
    confirmPassword: 'Confirm Password',
    confirmYourPassword: 'Confirm your password',
    passwordStrength: 'Password strength',
    passwordHint: 'Min 8 characters, 1 uppercase letter, 1 symbol',
    weak: 'weak',
    medium: 'medium',
    strong: 'strong',
    back: 'Back',
    continue: 'Continue',

    // Validation errors
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email address',
    phoneRequired: 'Phone number is required',
    invalidPhone: 'Please enter a valid phone number',
    preferredLanguageRequired: 'Preferred language is required',
    jobTitleRequired: 'Job title is required',
    passwordRequired: 'Password is required',
    confirmPasswordRequired: 'Please confirm your password',
    passwordsDoNotMatch: 'Passwords do not match',
    passwordMinChars: 'At least 8 characters',
    passwordUppercase: 'At least 1 uppercase letter',
    passwordSymbol: 'At least 1 symbol',

    // Company step
    companyInformation: 'Company Information',
    enterCompanyDetails: 'Enter your company\'s registration details',
    companyName: 'Company Name',
    enterCompanyName: 'Enter company name',
    localCompanyName: 'Local Company Name',
    enterLocalCompanyName: 'Enter company name in local language',
    businessRegistrationNumber: 'Business Registration Number',
    enterBusinessRegNumber: 'Enter your business registration number',
    streetAddress1: 'Street Address',
    enterStreetAddress1: 'Enter street address',
    streetAddress2: 'Street Address 2',
    enterStreetAddress2: 'Apt, suite, unit, building, floor, etc.',
    city: 'City',
    enterCity: 'Enter city',
    stateProvince: 'State / Province',
    enterStateProvince: 'Enter state or province',
    postalCode: 'Postal Code',
    enterPostalCode: 'Enter postal code',
    countryRegion: 'Country / Region',
    selectCountry: 'Select country',
    defaultLanguage: 'Default company language',
    basedOnAddress: 'All users will see this as their default language unless they specify a different preferred language on their profile.',
    defaultTimezone: 'Default Timezone',
    selectTimezone: 'Select your company\'s default timezone',
    primaryContact: 'Primary Contact',
    emailAddress: 'Email Address',
    contactEmailPlaceholder: 'contact@company.com',
    relationshipWith: 'Relationship with',
    relationshipDescription: 'This defines your company\'s business relationship with',
    completeSetup: 'Complete Setup',

    // Company validation errors
    companyNameRequired: 'Company name is required',
    streetAddress1Required: 'Street address is required',
    cityRequired: 'City is required',
    countryRequired: 'Country is required',
    companyPhoneRequired: 'Phone number is required',
    defaultLanguageRequired: 'Default language is required',
    primaryEmailRequired: 'Email is required',
    timezoneRequired: 'Timezone is required',
    businessRegRequired: 'Business registration number is required',
    relationshipRequired: 'Relationship type is required',

    // Duplicate detection
    accountExists: 'Account Already Exists',
    accountExistsDescription: 'An account with this email address already exists. Log in to automatically connect with',
    loginAndConnect: 'Log In & Connect',
    useDifferentEmail: 'Use Different Email',

    // Success
    allSet: 'You\'re all set!',
    congratulations: 'Congratulations! Your account has been created and you\'re now connected with',
    clientConsignee: 'Client / Consignee',
    connected: 'Connected',
    redirectNotice: 'We will redirect you to your home page...',
  },

  zh: {
    // Step labels
    stepProfile: '个人资料',
    stepCompany: '公司信息',
    stepComplete: '完成',

    // Profile step
    createYourAccount: '创建您的账户',
    setupPersonalProfile: '设置您的个人资料以开始使用',
    joiningToConnect: '您正在加入 Flexport 以连接',
    asSupplier: '作为供应商。',
    firstName: '名',
    lastName: '姓',
    enterFirstName: '输入名字',
    enterLastName: '输入姓氏',
    email: '电子邮件',
    emailPlaceholder: 'email@company.com',
    phoneNumber: '电话号码',
    phonePlaceholder: '+86 123 4567 8900',
    preferredLanguage: '首选语言',
    jobTitle: '职位',
    enterJobTitle: '输入您的职位',
    security: '安全设置',
    password: '密码',
    createPassword: '创建密码',
    confirmPassword: '确认密码',
    confirmYourPassword: '确认您的密码',
    passwordStrength: '密码强度',
    passwordHint: '至少8个字符，1个大写字母，1个符号',
    weak: '弱',
    medium: '中等',
    strong: '强',
    back: '返回',
    continue: '继续',

    // Validation errors
    firstNameRequired: '名字为必填项',
    lastNameRequired: '姓氏为必填项',
    emailRequired: '电子邮件为必填项',
    invalidEmail: '请输入有效的电子邮件地址',
    phoneRequired: '电话号码为必填项',
    invalidPhone: '请输入有效的电话号码',
    preferredLanguageRequired: '首选语言为必填项',
    jobTitleRequired: '职位为必填项',
    passwordRequired: '密码为必填项',
    confirmPasswordRequired: '请确认您的密码',
    passwordsDoNotMatch: '密码不匹配',
    passwordMinChars: '至少8个字符',
    passwordUppercase: '至少1个大写字母',
    passwordSymbol: '至少1个符号',

    // Company step
    companyInformation: '公司信息',
    enterCompanyDetails: '输入您公司的注册详情',
    companyName: '公司名称',
    enterCompanyName: '输入公司名称',
    localCompanyName: '本地公司名称',
    enterLocalCompanyName: '输入本地语言的公司名称',
    businessRegistrationNumber: '营业执照号码',
    enterBusinessRegNumber: '输入您的营业执照号码',
    streetAddress1: '街道地址',
    enterStreetAddress1: '输入街道地址',
    streetAddress2: '街道地址 2',
    enterStreetAddress2: '公寓、套房、单元、建筑、楼层等',
    city: '城市',
    enterCity: '输入城市',
    stateProvince: '省/州',
    enterStateProvince: '输入省或州',
    postalCode: '邮政编码',
    enterPostalCode: '输入邮政编码',
    countryRegion: '国家/地区',
    selectCountry: '选择国家',
    defaultLanguage: '公司默认语言',
    basedOnAddress: '所有用户将看到此语言作为默认语言，除非他们在个人资料中指定不同的首选语言。',
    defaultTimezone: '默认时区',
    selectTimezone: '选择公司的默认时区',
    primaryContact: '主要联系人',
    emailAddress: '电子邮件地址',
    contactEmailPlaceholder: 'contact@company.com',
    relationshipWith: '与',
    relationshipDescription: '这定义了您公司与',
    completeSetup: '完成设置',

    // Company validation errors
    companyNameRequired: '公司名称为必填项',
    streetAddress1Required: '街道地址为必填项',
    cityRequired: '城市为必填项',
    countryRequired: '国家为必填项',
    companyPhoneRequired: '电话号码为必填项',
    defaultLanguageRequired: '默认语言为必填项',
    primaryEmailRequired: '电子邮件为必填项',
    timezoneRequired: '时区为必填项',
    businessRegRequired: '营业执照号码为必填项',
    relationshipRequired: '关系类型为必填项',

    // Duplicate detection
    accountExists: '账户已存在',
    accountExistsDescription: '此电子邮件地址已存在账户。登录后将自动连接',
    loginAndConnect: '登录并连接',
    useDifferentEmail: '使用其他邮箱',

    // Success
    allSet: '设置完成！',
    congratulations: '恭喜！您的账户已创建，现已与',
    clientConsignee: '客户/收货人',
    connected: '已连接',
    redirectNotice: '我们将把您重定向到主页...',
  },

  vi: {
    // Step labels
    stepProfile: 'Hồ sơ',
    stepCompany: 'Công ty',
    stepComplete: 'Hoàn thành',

    // Profile step
    createYourAccount: 'Tạo Tài Khoản',
    setupPersonalProfile: 'Thiết lập hồ sơ cá nhân của bạn để bắt đầu',
    joiningToConnect: 'Bạn đang tham gia Flexport để kết nối với',
    asSupplier: 'với tư cách là Nhà cung cấp.',
    firstName: 'Tên',
    lastName: 'Họ',
    enterFirstName: 'Nhập tên',
    enterLastName: 'Nhập họ',
    email: 'Email',
    emailPlaceholder: 'email@company.com',
    phoneNumber: 'Số Điện Thoại',
    phonePlaceholder: '+84 123 456 7890',
    preferredLanguage: 'Ngôn Ngữ Ưa Thích',
    jobTitle: 'Chức Danh',
    enterJobTitle: 'Nhập chức danh của bạn',
    security: 'Bảo Mật',
    password: 'Mật Khẩu',
    createPassword: 'Tạo mật khẩu',
    confirmPassword: 'Xác Nhận Mật Khẩu',
    confirmYourPassword: 'Xác nhận mật khẩu của bạn',
    passwordStrength: 'Độ mạnh mật khẩu',
    passwordHint: 'Tối thiểu 8 ký tự, 1 chữ hoa, 1 ký hiệu',
    weak: 'yếu',
    medium: 'trung bình',
    strong: 'mạnh',
    back: 'Quay lại',
    continue: 'Tiếp tục',

    // Validation errors
    firstNameRequired: 'Tên là bắt buộc',
    lastNameRequired: 'Họ là bắt buộc',
    emailRequired: 'Email là bắt buộc',
    invalidEmail: 'Vui lòng nhập địa chỉ email hợp lệ',
    phoneRequired: 'Số điện thoại là bắt buộc',
    invalidPhone: 'Vui lòng nhập số điện thoại hợp lệ',
    preferredLanguageRequired: 'Ngôn ngữ ưa thích là bắt buộc',
    jobTitleRequired: 'Chức danh là bắt buộc',
    passwordRequired: 'Mật khẩu là bắt buộc',
    confirmPasswordRequired: 'Vui lòng xác nhận mật khẩu',
    passwordsDoNotMatch: 'Mật khẩu không khớp',
    passwordMinChars: 'Ít nhất 8 ký tự',
    passwordUppercase: 'Ít nhất 1 chữ hoa',
    passwordSymbol: 'Ít nhất 1 ký hiệu',

    // Company step
    companyInformation: 'Thông Tin Công Ty',
    enterCompanyDetails: 'Nhập thông tin đăng ký công ty của bạn',
    companyName: 'Tên Công Ty',
    enterCompanyName: 'Nhập tên công ty',
    localCompanyName: 'Tên Công Ty Địa Phương',
    enterLocalCompanyName: 'Nhập tên công ty bằng ngôn ngữ địa phương',
    businessRegistrationNumber: 'Số Đăng Ký Kinh Doanh',
    enterBusinessRegNumber: 'Nhập số đăng ký kinh doanh của bạn',
    streetAddress1: 'Địa Chỉ Đường',
    enterStreetAddress1: 'Nhập địa chỉ đường',
    streetAddress2: 'Địa Chỉ Đường 2',
    enterStreetAddress2: 'Căn hộ, phòng, đơn vị, tòa nhà, tầng, v.v.',
    city: 'Thành Phố',
    enterCity: 'Nhập thành phố',
    stateProvince: 'Tỉnh / Bang',
    enterStateProvince: 'Nhập tỉnh hoặc bang',
    postalCode: 'Mã Bưu Điện',
    enterPostalCode: 'Nhập mã bưu điện',
    countryRegion: 'Quốc Gia / Khu Vực',
    selectCountry: 'Chọn quốc gia',
    defaultLanguage: 'Ngôn ngữ mặc định của công ty',
    basedOnAddress: 'Tất cả người dùng sẽ thấy đây là ngôn ngữ mặc định trừ khi họ chỉ định ngôn ngữ ưa thích khác trong hồ sơ của họ.',
    defaultTimezone: 'Múi Giờ Mặc Định',
    selectTimezone: 'Chọn múi giờ mặc định của công ty',
    primaryContact: 'Liên Hệ Chính',
    emailAddress: 'Địa Chỉ Email',
    contactEmailPlaceholder: 'contact@company.com',
    relationshipWith: 'Mối quan hệ với',
    relationshipDescription: 'Điều này xác định mối quan hệ kinh doanh của công ty bạn với',
    completeSetup: 'Hoàn Tất Thiết Lập',

    // Company validation errors
    companyNameRequired: 'Tên công ty là bắt buộc',
    streetAddress1Required: 'Địa chỉ đường là bắt buộc',
    cityRequired: 'Thành phố là bắt buộc',
    countryRequired: 'Quốc gia là bắt buộc',
    companyPhoneRequired: 'Số điện thoại là bắt buộc',
    defaultLanguageRequired: 'Ngôn ngữ mặc định là bắt buộc',
    primaryEmailRequired: 'Email là bắt buộc',
    timezoneRequired: 'Múi giờ là bắt buộc',
    businessRegRequired: 'Số đăng ký kinh doanh là bắt buộc',
    relationshipRequired: 'Loại mối quan hệ là bắt buộc',

    // Duplicate detection
    accountExists: 'Tài Khoản Đã Tồn Tại',
    accountExistsDescription: 'Một tài khoản với địa chỉ email này đã tồn tại. Đăng nhập để tự động kết nối với',
    loginAndConnect: 'Đăng Nhập & Kết Nối',
    useDifferentEmail: 'Sử Dụng Email Khác',

    // Success
    allSet: 'Bạn đã sẵn sàng!',
    congratulations: 'Chúc mừng! Tài khoản của bạn đã được tạo và bạn đã kết nối với',
    clientConsignee: 'Khách hàng / Người nhận hàng',
    connected: 'Đã kết nối',
    redirectNotice: 'Chúng tôi sẽ chuyển hướng bạn đến trang chủ...',
  },

  es: {
    // Step labels
    stepProfile: 'Perfil',
    stepCompany: 'Empresa',
    stepComplete: 'Completado',

    // Profile step
    createYourAccount: 'Crea Tu Cuenta',
    setupPersonalProfile: 'Configura tu perfil personal para comenzar',
    joiningToConnect: 'Te estás uniendo a Flexport para conectar con',
    asSupplier: 'como Proveedor.',
    firstName: 'Nombre',
    lastName: 'Apellido',
    enterFirstName: 'Ingresa tu nombre',
    enterLastName: 'Ingresa tu apellido',
    email: 'Correo Electrónico',
    emailPlaceholder: 'email@empresa.com',
    phoneNumber: 'Número de Teléfono',
    phonePlaceholder: '+52 123 456 7890',
    preferredLanguage: 'Idioma Preferido',
    jobTitle: 'Cargo',
    enterJobTitle: 'Ingresa tu cargo',
    security: 'Seguridad',
    password: 'Contraseña',
    createPassword: 'Crea una contraseña',
    confirmPassword: 'Confirmar Contraseña',
    confirmYourPassword: 'Confirma tu contraseña',
    passwordStrength: 'Fortaleza de la contraseña',
    passwordHint: 'Mín. 8 caracteres, 1 mayúscula, 1 símbolo',
    weak: 'débil',
    medium: 'media',
    strong: 'fuerte',
    back: 'Atrás',
    continue: 'Continuar',

    // Validation errors
    firstNameRequired: 'El nombre es obligatorio',
    lastNameRequired: 'El apellido es obligatorio',
    emailRequired: 'El correo electrónico es obligatorio',
    invalidEmail: 'Por favor ingresa un correo electrónico válido',
    phoneRequired: 'El número de teléfono es obligatorio',
    invalidPhone: 'Por favor ingresa un número de teléfono válido',
    preferredLanguageRequired: 'El idioma preferido es obligatorio',
    jobTitleRequired: 'El cargo es obligatorio',
    passwordRequired: 'La contraseña es obligatoria',
    confirmPasswordRequired: 'Por favor confirma tu contraseña',
    passwordsDoNotMatch: 'Las contraseñas no coinciden',
    passwordMinChars: 'Al menos 8 caracteres',
    passwordUppercase: 'Al menos 1 letra mayúscula',
    passwordSymbol: 'Al menos 1 símbolo',

    // Company step
    companyInformation: 'Información de la Empresa',
    enterCompanyDetails: 'Ingresa los datos de registro de tu empresa',
    companyName: 'Nombre de la Empresa',
    enterCompanyName: 'Ingresa el nombre de la empresa',
    localCompanyName: 'Nombre Local de la Empresa',
    enterLocalCompanyName: 'Ingresa el nombre de la empresa en idioma local',
    businessRegistrationNumber: 'Número de Registro Empresarial',
    enterBusinessRegNumber: 'Ingresa tu número de registro empresarial',
    streetAddress1: 'Dirección',
    enterStreetAddress1: 'Ingresa la dirección',
    streetAddress2: 'Dirección 2',
    enterStreetAddress2: 'Apto, suite, unidad, edificio, piso, etc.',
    city: 'Ciudad',
    enterCity: 'Ingresa la ciudad',
    stateProvince: 'Estado / Provincia',
    enterStateProvince: 'Ingresa el estado o provincia',
    postalCode: 'Código Postal',
    enterPostalCode: 'Ingresa el código postal',
    countryRegion: 'País / Región',
    selectCountry: 'Selecciona un país',
    defaultLanguage: 'Idioma predeterminado de la empresa',
    basedOnAddress: 'Todos los usuarios verán este como su idioma predeterminado a menos que especifiquen un idioma preferido diferente en su perfil.',
    defaultTimezone: 'Zona Horaria Predeterminada',
    selectTimezone: 'Selecciona la zona horaria predeterminada de tu empresa',
    primaryContact: 'Contacto Principal',
    emailAddress: 'Dirección de Correo',
    contactEmailPlaceholder: 'contacto@empresa.com',
    relationshipWith: 'Relación con',
    relationshipDescription: 'Esto define la relación comercial de tu empresa con',
    completeSetup: 'Completar Configuración',

    // Company validation errors
    companyNameRequired: 'El nombre de la empresa es obligatorio',
    streetAddress1Required: 'La dirección es obligatoria',
    cityRequired: 'La ciudad es obligatoria',
    countryRequired: 'El país es obligatorio',
    companyPhoneRequired: 'El número de teléfono es obligatorio',
    defaultLanguageRequired: 'El idioma predeterminado es obligatorio',
    primaryEmailRequired: 'El correo electrónico es obligatorio',
    timezoneRequired: 'La zona horaria es obligatoria',
    businessRegRequired: 'El número de registro empresarial es obligatorio',
    relationshipRequired: 'El tipo de relación es obligatorio',

    // Duplicate detection
    accountExists: 'La Cuenta Ya Existe',
    accountExistsDescription: 'Ya existe una cuenta con esta dirección de correo. Inicia sesión para conectar automáticamente con',
    loginAndConnect: 'Iniciar Sesión y Conectar',
    useDifferentEmail: 'Usar Otro Correo',

    // Success
    allSet: '¡Todo listo!',
    congratulations: '¡Felicitaciones! Tu cuenta ha sido creada y ahora estás conectado con',
    clientConsignee: 'Cliente / Consignatario',
    connected: 'Conectado',
    redirectNotice: 'Te redirigiremos a tu página de inicio...',
  },

  de: {
    // Step labels
    stepProfile: 'Profil',
    stepCompany: 'Unternehmen',
    stepComplete: 'Abgeschlossen',

    // Profile step
    createYourAccount: 'Konto Erstellen',
    setupPersonalProfile: 'Richten Sie Ihr persönliches Profil ein, um zu beginnen',
    joiningToConnect: 'Sie treten Flexport bei, um sich mit',
    asSupplier: 'als Lieferant zu verbinden.',
    firstName: 'Vorname',
    lastName: 'Nachname',
    enterFirstName: 'Vorname eingeben',
    enterLastName: 'Nachname eingeben',
    email: 'E-Mail',
    emailPlaceholder: 'email@unternehmen.de',
    phoneNumber: 'Telefonnummer',
    phonePlaceholder: '+49 123 456 7890',
    preferredLanguage: 'Bevorzugte Sprache',
    jobTitle: 'Berufsbezeichnung',
    enterJobTitle: 'Geben Sie Ihre Berufsbezeichnung ein',
    security: 'Sicherheit',
    password: 'Passwort',
    createPassword: 'Passwort erstellen',
    confirmPassword: 'Passwort Bestätigen',
    confirmYourPassword: 'Bestätigen Sie Ihr Passwort',
    passwordStrength: 'Passwortstärke',
    passwordHint: 'Mind. 8 Zeichen, 1 Großbuchstabe, 1 Symbol',
    weak: 'schwach',
    medium: 'mittel',
    strong: 'stark',
    back: 'Zurück',
    continue: 'Weiter',

    // Validation errors
    firstNameRequired: 'Vorname ist erforderlich',
    lastNameRequired: 'Nachname ist erforderlich',
    emailRequired: 'E-Mail ist erforderlich',
    invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    phoneRequired: 'Telefonnummer ist erforderlich',
    invalidPhone: 'Bitte geben Sie eine gültige Telefonnummer ein',
    preferredLanguageRequired: 'Bevorzugte Sprache ist erforderlich',
    jobTitleRequired: 'Berufsbezeichnung ist erforderlich',
    passwordRequired: 'Passwort ist erforderlich',
    confirmPasswordRequired: 'Bitte bestätigen Sie Ihr Passwort',
    passwordsDoNotMatch: 'Passwörter stimmen nicht überein',
    passwordMinChars: 'Mindestens 8 Zeichen',
    passwordUppercase: 'Mindestens 1 Großbuchstabe',
    passwordSymbol: 'Mindestens 1 Symbol',

    // Company step
    companyInformation: 'Unternehmensinformationen',
    enterCompanyDetails: 'Geben Sie die Registrierungsdaten Ihres Unternehmens ein',
    companyName: 'Firmenname',
    enterCompanyName: 'Firmennamen eingeben',
    localCompanyName: 'Lokaler Firmenname',
    enterLocalCompanyName: 'Firmennamen in lokaler Sprache eingeben',
    businessRegistrationNumber: 'Handelsregisternummer',
    enterBusinessRegNumber: 'Geben Sie Ihre Handelsregisternummer ein',
    streetAddress1: 'Straßenadresse',
    enterStreetAddress1: 'Straßenadresse eingeben',
    streetAddress2: 'Straßenadresse 2',
    enterStreetAddress2: 'Wohnung, Suite, Einheit, Gebäude, Etage, usw.',
    city: 'Stadt',
    enterCity: 'Stadt eingeben',
    stateProvince: 'Bundesland / Provinz',
    enterStateProvince: 'Bundesland oder Provinz eingeben',
    postalCode: 'Postleitzahl',
    enterPostalCode: 'Postleitzahl eingeben',
    countryRegion: 'Land / Region',
    selectCountry: 'Land auswählen',
    defaultLanguage: 'Standard-Unternehmenssprache',
    basedOnAddress: 'Alle Benutzer sehen dies als ihre Standardsprache, es sei denn, sie geben in ihrem Profil eine andere bevorzugte Sprache an.',
    defaultTimezone: 'Standard-Zeitzone',
    selectTimezone: 'Wählen Sie die Standard-Zeitzone Ihres Unternehmens',
    primaryContact: 'Hauptansprechpartner',
    emailAddress: 'E-Mail-Adresse',
    contactEmailPlaceholder: 'kontakt@unternehmen.de',
    relationshipWith: 'Beziehung zu',
    relationshipDescription: 'Dies definiert die Geschäftsbeziehung Ihres Unternehmens mit',
    completeSetup: 'Einrichtung Abschließen',

    // Company validation errors
    companyNameRequired: 'Firmenname ist erforderlich',
    streetAddress1Required: 'Straßenadresse ist erforderlich',
    cityRequired: 'Stadt ist erforderlich',
    countryRequired: 'Land ist erforderlich',
    companyPhoneRequired: 'Telefonnummer ist erforderlich',
    defaultLanguageRequired: 'Standardsprache ist erforderlich',
    primaryEmailRequired: 'E-Mail ist erforderlich',
    timezoneRequired: 'Zeitzone ist erforderlich',
    businessRegRequired: 'Handelsregisternummer ist erforderlich',
    relationshipRequired: 'Beziehungstyp ist erforderlich',

    // Duplicate detection
    accountExists: 'Konto Existiert Bereits',
    accountExistsDescription: 'Ein Konto mit dieser E-Mail-Adresse existiert bereits. Melden Sie sich an, um automatisch eine Verbindung herzustellen mit',
    loginAndConnect: 'Anmelden & Verbinden',
    useDifferentEmail: 'Andere E-Mail Verwenden',

    // Success
    allSet: 'Alles bereit!',
    congratulations: 'Herzlichen Glückwunsch! Ihr Konto wurde erstellt und Sie sind jetzt verbunden mit',
    clientConsignee: 'Kunde / Empfänger',
    connected: 'Verbunden',
    redirectNotice: 'Wir leiten Sie zu Ihrer Startseite weiter...',
  },

  ja: {
    // Step labels
    stepProfile: 'プロフィール',
    stepCompany: '会社情報',
    stepComplete: '完了',

    // Profile step
    createYourAccount: 'アカウントを作成',
    setupPersonalProfile: '個人プロフィールを設定して始めましょう',
    joiningToConnect: 'Flexportに参加して',
    asSupplier: 'とサプライヤーとして接続します。',
    firstName: '名',
    lastName: '姓',
    enterFirstName: '名前を入力',
    enterLastName: '姓を入力',
    email: 'メールアドレス',
    emailPlaceholder: 'email@company.co.jp',
    phoneNumber: '電話番号',
    phonePlaceholder: '+81 3 1234 5678',
    preferredLanguage: '希望言語',
    jobTitle: '役職',
    enterJobTitle: '役職を入力',
    security: 'セキュリティ',
    password: 'パスワード',
    createPassword: 'パスワードを作成',
    confirmPassword: 'パスワードの確認',
    confirmYourPassword: 'パスワードを確認',
    passwordStrength: 'パスワード強度',
    passwordHint: '8文字以上、大文字1つ、記号1つ',
    weak: '弱い',
    medium: '普通',
    strong: '強い',
    back: '戻る',
    continue: '続ける',

    // Validation errors
    firstNameRequired: '名前は必須です',
    lastNameRequired: '姓は必須です',
    emailRequired: 'メールアドレスは必須です',
    invalidEmail: '有効なメールアドレスを入力してください',
    phoneRequired: '電話番号は必須です',
    invalidPhone: '有効な電話番号を入力してください',
    preferredLanguageRequired: '希望言語は必須です',
    jobTitleRequired: '役職は必須です',
    passwordRequired: 'パスワードは必須です',
    confirmPasswordRequired: 'パスワードを確認してください',
    passwordsDoNotMatch: 'パスワードが一致しません',
    passwordMinChars: '8文字以上',
    passwordUppercase: '大文字1つ以上',
    passwordSymbol: '記号1つ以上',

    // Company step
    companyInformation: '会社情報',
    enterCompanyDetails: '会社の登録情報を入力してください',
    companyName: '会社名',
    enterCompanyName: '会社名を入力',
    localCompanyName: '現地語の会社名',
    enterLocalCompanyName: '現地語で会社名を入力',
    businessRegistrationNumber: '法人番号',
    enterBusinessRegNumber: '法人番号を入力',
    streetAddress1: '住所',
    enterStreetAddress1: '住所を入力',
    streetAddress2: '住所2',
    enterStreetAddress2: 'アパート、スイート、ユニット、建物、階など',
    city: '市区町村',
    enterCity: '市区町村を入力',
    stateProvince: '都道府県',
    enterStateProvince: '都道府県を入力',
    postalCode: '郵便番号',
    enterPostalCode: '郵便番号を入力',
    countryRegion: '国 / 地域',
    selectCountry: '国を選択',
    defaultLanguage: '会社のデフォルト言語',
    basedOnAddress: 'すべてのユーザーは、プロフィールで別の希望言語を指定しない限り、これをデフォルト言語として表示します。',
    defaultTimezone: 'デフォルトタイムゾーン',
    selectTimezone: '会社のデフォルトタイムゾーンを選択',
    primaryContact: '主要連絡先',
    emailAddress: 'メールアドレス',
    contactEmailPlaceholder: 'contact@company.co.jp',
    relationshipWith: 'との関係',
    relationshipDescription: 'これは貴社と',
    completeSetup: '設定を完了',

    // Company validation errors
    companyNameRequired: '会社名は必須です',
    streetAddress1Required: '住所は必須です',
    cityRequired: '市区町村は必須です',
    countryRequired: '国は必須です',
    companyPhoneRequired: '電話番号は必須です',
    defaultLanguageRequired: 'デフォルト言語は必須です',
    primaryEmailRequired: 'メールアドレスは必須です',
    timezoneRequired: 'タイムゾーンは必須です',
    businessRegRequired: '法人番号は必須です',
    relationshipRequired: '関係タイプは必須です',

    // Duplicate detection
    accountExists: 'アカウントが既に存在します',
    accountExistsDescription: 'このメールアドレスのアカウントは既に存在します。ログインして自動的に接続します',
    loginAndConnect: 'ログインして接続',
    useDifferentEmail: '別のメールを使用',

    // Success
    allSet: '準備完了！',
    congratulations: 'おめでとうございます！アカウントが作成され、',
    clientConsignee: 'クライアント / 荷受人',
    connected: '接続済み',
    redirectNotice: 'ホームページにリダイレクトします...',
  },

  ko: {
    // Step labels
    stepProfile: '프로필',
    stepCompany: '회사',
    stepComplete: '완료',

    // Profile step
    createYourAccount: '계정 만들기',
    setupPersonalProfile: '시작하려면 개인 프로필을 설정하세요',
    joiningToConnect: 'Flexport에 가입하여',
    asSupplier: '와 공급업체로 연결합니다.',
    firstName: '이름',
    lastName: '성',
    enterFirstName: '이름 입력',
    enterLastName: '성 입력',
    email: '이메일',
    emailPlaceholder: 'email@company.co.kr',
    phoneNumber: '전화번호',
    phonePlaceholder: '+82 2 1234 5678',
    preferredLanguage: '선호 언어',
    jobTitle: '직책',
    enterJobTitle: '직책을 입력하세요',
    security: '보안',
    password: '비밀번호',
    createPassword: '비밀번호 만들기',
    confirmPassword: '비밀번호 확인',
    confirmYourPassword: '비밀번호를 확인하세요',
    passwordStrength: '비밀번호 강도',
    passwordHint: '최소 8자, 대문자 1개, 기호 1개',
    weak: '약함',
    medium: '보통',
    strong: '강함',
    back: '뒤로',
    continue: '계속',

    // Validation errors
    firstNameRequired: '이름은 필수입니다',
    lastNameRequired: '성은 필수입니다',
    emailRequired: '이메일은 필수입니다',
    invalidEmail: '유효한 이메일 주소를 입력하세요',
    phoneRequired: '전화번호는 필수입니다',
    invalidPhone: '유효한 전화번호를 입력하세요',
    preferredLanguageRequired: '선호 언어는 필수입니다',
    jobTitleRequired: '직책은 필수입니다',
    passwordRequired: '비밀번호는 필수입니다',
    confirmPasswordRequired: '비밀번호를 확인해주세요',
    passwordsDoNotMatch: '비밀번호가 일치하지 않습니다',
    passwordMinChars: '최소 8자',
    passwordUppercase: '대문자 1개 이상',
    passwordSymbol: '기호 1개 이상',

    // Company step
    companyInformation: '회사 정보',
    enterCompanyDetails: '회사 등록 정보를 입력하세요',
    companyName: '회사명',
    enterCompanyName: '회사명 입력',
    localCompanyName: '현지 회사명',
    enterLocalCompanyName: '현지 언어로 회사명 입력',
    businessRegistrationNumber: '사업자등록번호',
    enterBusinessRegNumber: '사업자등록번호를 입력하세요',
    streetAddress1: '도로명 주소',
    enterStreetAddress1: '도로명 주소 입력',
    streetAddress2: '상세 주소',
    enterStreetAddress2: '아파트, 스위트, 유닛, 건물, 층 등',
    city: '시/군/구',
    enterCity: '시/군/구 입력',
    stateProvince: '시/도',
    enterStateProvince: '시/도 입력',
    postalCode: '우편번호',
    enterPostalCode: '우편번호 입력',
    countryRegion: '국가 / 지역',
    selectCountry: '국가 선택',
    defaultLanguage: '회사 기본 언어',
    basedOnAddress: '모든 사용자는 프로필에서 다른 선호 언어를 지정하지 않는 한 이 언어를 기본 언어로 보게 됩니다.',
    defaultTimezone: '기본 시간대',
    selectTimezone: '회사의 기본 시간대를 선택하세요',
    primaryContact: '주요 연락처',
    emailAddress: '이메일 주소',
    contactEmailPlaceholder: 'contact@company.co.kr',
    relationshipWith: '와의 관계',
    relationshipDescription: '이것은 귀사와',
    completeSetup: '설정 완료',

    // Company validation errors
    companyNameRequired: '회사명은 필수입니다',
    streetAddress1Required: '도로명 주소는 필수입니다',
    cityRequired: '시/군/구는 필수입니다',
    countryRequired: '국가는 필수입니다',
    companyPhoneRequired: '전화번호는 필수입니다',
    defaultLanguageRequired: '기본 언어는 필수입니다',
    primaryEmailRequired: '이메일은 필수입니다',
    timezoneRequired: '시간대는 필수입니다',
    businessRegRequired: '사업자등록번호는 필수입니다',
    relationshipRequired: '관계 유형은 필수입니다',

    // Duplicate detection
    accountExists: '계정이 이미 존재합니다',
    accountExistsDescription: '이 이메일 주소로 계정이 이미 존재합니다. 로그인하여 자동으로 연결하세요',
    loginAndConnect: '로그인 및 연결',
    useDifferentEmail: '다른 이메일 사용',

    // Success
    allSet: '모든 준비가 완료되었습니다!',
    congratulations: '축하합니다! 계정이 생성되었으며 이제',
    clientConsignee: '고객 / 수하인',
    connected: '연결됨',
    redirectNotice: '홈페이지로 이동합니다...',
  },
};

export function getTranslations(languageCode: string): OnboardingTranslations {
  return translations[languageCode] || translations.en;
}
