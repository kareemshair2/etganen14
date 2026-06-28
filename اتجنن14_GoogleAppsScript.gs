/**
 * حملة اتجنن 14 — Google Apps Script
 * 
 * التعليمات:
 * 1. افتح Google Sheets وأنشئ Sheet جديد
 * 2. اذهب إلى Extensions > Apps Script
 * 3. الصق الكود ده كله
 * 4. غير اسم Sheet في السطر 18 لو حابب
 * 5. اعمل Save > Deploy > New Deployment > Web App
 * 6- تأكد من الإعدادات:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7- انسخ الـ URL اللي هيظهرك وحطه في ملف HTML مكان
 *    YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
 */

const SHEET_NAME = 'اتجنن14'; // غير اسم الشيت لو حابب

function doGet() {
  return HtmlService.createHtmlOutput('<h2>اتجنن 14 API</h2><p>الاستمارة شغالة ✅</p>');
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // لو الشيت مش موجود، اعمله
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // عنوان الأعمدة
      sheet.appendRow([
        'التاريخ',
        'الاسم كامل',
        'السن',
        'تاريخ الميلاد',
        'رقم الموبايل',
        'النوع',
        'المدرسة',
        'الصف الدراسي',
        'المركز',
        'العنوان',
        'عرف منين',
        'مصدر تاني',
        '3 كلمات',
        'المهارة المطلوب تطويرها',
        'مهارة أخرى',
        'مستوى الأنشطة',
        'الأنشطة المفضلة',
        'الرياضة',
        'الموهبة',
        'سبب الانضمام',
        'Timestamp'
      ]);
    }

    // قراءة البيانات
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    // صف البيانات
    const row = [
      new Date(),
      data.full_name || '',
      data.age || '',
      data.birth_date || '',
      data.phone || '',
      data.gender || '',
      data.school || '',
      data.grade || '',
      data.center || '',
      data.address || '',
      data.heard_from || '',
      data.heard_from_other || '',
      data.three_words || '',
      data.skill_to_develop || '',
      data.skill_other || '',
      data.activity_level || '',
      data.activities || '',
      data.sport || '',
      data.talent || '',
      data.reason || '',
      data.timestamp || new Date().toISOString()
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'تم التسجيل بنجاح' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
