import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// מיפוי של המיקומים החדשים של הקבצים
const fileMapping = {
  // Auth components
  'components/host/HostLogin': 'components/auth/HostLogin',
  'components/host/SignupHost': 'components/auth/SignupHost',

  // Common components
  'components/Header': 'components/common/Header',
  'components/AboutPage': 'components/common/AboutPage',
  'components/ContactPage': 'components/common/ContactPage',
  'components/Home': 'components/common/Home',
  'components/StyledLink': 'components/common/StyledLink',
  'components/features/BackButton': 'components/common/BackButton',

  // Event components
  'components/host/CreateEvent': 'components/events/CreateEvent',
  'components/host/EventDetails': 'components/events/EventDetails',
  'components/host/ViewEvents': 'components/events/ViewEvents',
  'components/host/SuccessMessage': 'components/events/SuccessMessage',

  // Guest components
  'components/guest/GuestForm': 'components/guests/GuestForm',
  'components/qrCode': 'components/guests/qrCode',

  // Host components
  'components/host/Host': 'components/host/Host',
  'components/host/HostOptions': 'components/host/HostOptions',

  // Invitation components
  'components/host/custom-event-invitation/constants': 'components/invitation/constants',
  'components/host/custom-event-invitation/CustomizableInvitation': 'components/invitation/CustomizableInvitation',
  'components/host/custom-event-invitation/CustomizationPanel': 'components/invitation/CustomizationPanel',
  'components/host/custom-event-invitation/InvitationPreview': 'components/invitation/InvitationPreview',

  // CSS files
  'cssS/AuthLayout.css': 'styles/components/AuthLayout.css',
  'cssS/CreateEvent.css': 'styles/components/CreateEvent.css',
  'cssS/Guest.css': 'styles/components/Guest.css',
  'cssS/Header.css': 'styles/components/Header.css',
  'cssS/Home.css': 'styles/components/Home.css',
  'cssS/Host.css': 'styles/components/Host.css',
  'cssS/HostLogin.css': 'styles/components/HostLogin.css',
  'cssS/HostOptions.css': 'styles/components/HostOptions.css',
  'cssS/SignupForm.css': 'styles/components/SignupForm.css',
  'cssS/SuccessMessage.css': 'styles/components/SuccessMessage.css',
  'cssS/ViewEvents.css': 'styles/components/ViewEvents.css',
  'cssS/MainLayout.css': 'styles/layouts/MainLayout.css',

  // Images
  'fotos/': 'assets/images/'
};

// פונקציה שמעדכנת את ה-imports בקובץ
function updateImports(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // עדכון ה-imports
    for (const [oldPath, newPath] of Object.entries(fileMapping)) {
      const regex = new RegExp(`from ['"](\.{1,2}/${oldPath})`, 'g');
      const importRegex = new RegExp(`import .* from ['"](\.{1,2}/${oldPath})['"]`, 'g');
      const cssImportRegex = new RegExp(`import ['"](\.{1,2}/${oldPath})['"]`, 'g');

      if (content.match(regex) || content.match(importRegex) || content.match(cssImportRegex)) {
        hasChanges = true;
        content = content
          .replace(regex, `from '$1`)
          .replace(new RegExp(oldPath, 'g'), newPath);
      }
    }

    // שמירת השינויים אם היו כאלה
    if (hasChanges) {
      writeFileSync(filePath, content, 'utf8');
      console.log(`Updated imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// פונקציה רקורסיבית שעוברת על כל הקבצים בתיקייה
function processDirectory(directory) {
  const files = readdirSync(directory);

  for (const file of files) {
    const fullPath = join(directory, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      updateImports(fullPath);
    }
  }
}

// התחלת העדכון
console.log('Starting import updates...');
processDirectory(join(__dirname, 'src'));
console.log('Import updates completed!');