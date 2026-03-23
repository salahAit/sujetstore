**دليل استيراد البيانات (JSON)**  
تعتمد منصة SujetStore على هيكلية JSON موحدة لتبادل بيانات التمارين والمواضيع القابلة للطباعة. يمكنك استخدام هذه الهيكلية لاستيراد بيانات من مصادر خارجية أو نسخ احتياطي.  
**1. استيراد تمرين (Exercise)**  
لإضافة تمرين إلى **بنك التمارين المطبوعة**، يجب أن يحتوي ملف JSON على المصفوفة content التي تمثل محتوى التمرين (الكتل).  
**هيكل التمرين الأساسي:**  
[  
   {  
     "title": "التمرين الأول: الميكانيك",  
     "points": 6,  
     "yearSubjectId": 45, // ID المادة (مهم جداً للربط)  
     "trimesterId": "t1", // اختياري (t1, t2, t3)  
     "unit": "الميكانيك", // اختياري  
     "content": [  
       {  
         "type": "text",  
         "content": "يتحرك دراج بسرعة ثابتة..."  
       },  
       {  
         "type": "math",  
         "content": "v = \\frac{d}{t}",  
         "display": true  
       }  
     ]  
   }  
 ]  
   
**أنواع الكتل المدعومة في **content **:**  
- text (نص)  
- math (معادلات LaTeX)  
- table (جداول)  
- image (صور - يجب أن يكون الحقل src رابطًا صالحًا للصورة أو Base64)  
- true_false (صح/خطأ)  
- multiple_choice (اختيار متعدد - QCM)  
- diagram_flow (مخطط تدفقي)  
- labeling (تسميات)  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OUQmAABBAsSdYxKYXx1gmEBOIFfwTYUuwZWa2ag8AgL841uquzq8nAAC8dj05WgYLQTzjnAAAAABJRU5ErkJggg==)  
**2. استيراد موضوع كامل (Full Subject / ExamDocument)**  
لإعادة بناء موضوع كامل في **منشئ المواضيع** (Sujet Builder)، يجب توفير كائن JSON يحتوي على وصف الفحص (Metadata) وقائمة التمارين (Exercises). هذا الهيكل لا يحفظ في قاعدة البيانات مباشرة كجدول subjects، بل يتم تحميله إلى "حالة" المنشئ لتوليد الـ PDF فوراً أو التعديل عليه.  
**هيكل الموضوع الكامل:**  
{  
   "templateId": "middle/exam", // القالب المستخدم  
   "document": {  
     "metadata": {  
       "levelId": "moyen",  
       "yearId": "y4m",  
       "yearName": "السنة الرابعة متوسط",  
       "subjectId": "s_physics",  
       "subjectName": "العلوم الفيزيائية والتكنولوجيا",  
       "trimesterId": "t1",  
       "trimesterName": "الفصل الأول",  
       "docType": "exam",  
       "academicYear": "2024/2025",  
       "duration": "ساعة ونصف",  
       "schoolName": "متوسطة الشهيد...", // اختياري  
       "siteUrl": "sujetstore.com"  
     },  
     "exercises": [  
       {  
         "id": "ex_123", // معرف فريد مؤقت  
         "num": "التمرين الأول",  
         "points": 6,  
         "instruction": "في مخبر الفيزياء...",  
         "content": [  
           {  
             "type": "text",  
             "content": "1. عرف السرعة."  
           }  
         ]  
       },  
       {  
          // تمرين آخر...  
       }  
     ]  
   }  
 }  
   
**التحديث القادم (Phase 21)**  
سيتم إضافة زر **"استيراد JSON"** في كل من:  
1. **لوحة التحكم -> بنك التمارين**: لرفع ملف JSON وحفظ التمارين مباشرة في قاعدة البيانات.  
2. **لوحة التحكم -> منشئ المواضيع**: لرفع ملف JSON (موضوع كامل) وتعبئة واجهة المنشئ بشكل تلقائي تماماً.  
