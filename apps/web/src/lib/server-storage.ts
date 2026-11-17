import path from "path";
import fs from "fs/promises";
import { FullSiteContent, INITIAL_SITE_CONTENT } from "./cms-store";
import { FALLBACK_PRODUCTS } from "./products-data";

export interface OperationsRecord {
  id: string;
  type: "contact" | "career" | "event" | "internship" | "hardware_inquiry";
  title: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  name: string;
  email: string;
  phone?: string;
  submittedAt: string;
  data: Record<string, any>;
  notes?: string;
}

function getDataFilePath(filename: string): string {
  const cwd = process.cwd();
  const baseDir = cwd.endsWith("apps/web")
    ? path.join(cwd, "data")
    : path.join(cwd, "apps", "web", "data");
  return path.join(baseDir, filename);
}

async function ensureDir(filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // Already exists
  }
}

export async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  const filePath = getDataFilePath(filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    if (!raw.trim()) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      // First time reading: write defaultValue to disk
      await writeJsonFile(filename, defaultValue);
      return defaultValue;
    }
    console.error(`Error reading ${filename}:`, err);
    return defaultValue;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<boolean> {
  const filePath = getDataFilePath(filename);
  try {
    await ensureDir(filePath);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// 1. CMS Content
export async function getCmsContent(): Promise<FullSiteContent> {
  return await readJsonFile<FullSiteContent>("cms-content.json", INITIAL_SITE_CONTENT);
}

export async function saveCmsContent(content: FullSiteContent): Promise<boolean> {
  return await writeJsonFile("cms-content.json", content);
}

// 2. Gallery Items
export async function getGalleryItems(): Promise<any[]> {
  const defaultGallery = INITIAL_SITE_CONTENT.gallery || [];
  return await readJsonFile<any[]>("gallery-items.json", defaultGallery);
}

export async function saveGalleryItems(items: any[]): Promise<boolean> {
  return await writeJsonFile("gallery-items.json", items);
}

// 3. Operations Records (Inbound Contact, Careers, Events, Internships)
export async function getOperationsRecords(filter?: {
  type?: string;
  status?: string;
  search?: string;
}): Promise<OperationsRecord[]> {
  const records = await readJsonFile<OperationsRecord[]>("operations-records.json", []);
  return records.filter((r) => {
    if (filter?.type && filter.type !== "all" && r.type !== filter.type) return false;
    if (filter?.status && filter.status !== "all" && r.status !== filter.status) return false;
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      const matchName = r.name?.toLowerCase().includes(q);
      const matchEmail = r.email?.toLowerCase().includes(q);
      const matchTitle = r.title?.toLowerCase().includes(q);
      const matchPhone = r.phone?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchTitle && !matchPhone) return false;
    }
    return true;
  });
}

export async function addOperationsRecord(
  item: Omit<OperationsRecord, "id" | "status" | "submittedAt"> & {
    id?: string;
    status?: OperationsRecord["status"];
    submittedAt?: string;
  }
): Promise<OperationsRecord> {
  const records = await readJsonFile<OperationsRecord[]>("operations-records.json", []);
  const newRecord: OperationsRecord = {
    id: item.id || `rec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: item.type,
    title: item.title,
    status: item.status || "new",
    name: item.name,
    email: item.email,
    phone: item.phone || "",
    submittedAt: item.submittedAt || new Date().toISOString(),
    data: item.data || {},
    notes: item.notes || "",
  };

  records.unshift(newRecord);
  await writeJsonFile("operations-records.json", records);
  return newRecord;
}

export async function updateOperationsRecord(
  id: string,
  updates: Partial<Pick<OperationsRecord, "status" | "notes">>
): Promise<OperationsRecord | null> {
  const records = await readJsonFile<OperationsRecord[]>("operations-records.json", []);
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  records[idx] = { ...records[idx], ...updates };
  await writeJsonFile("operations-records.json", records);
  return records[idx];
}

export async function deleteOperationsRecord(id: string): Promise<boolean> {
  const records = await readJsonFile<OperationsRecord[]>("operations-records.json", []);
  const filtered = records.filter((r) => r.id !== id);
  return await writeJsonFile("operations-records.json", filtered);
}

// 4. Store Hardware Products
export async function getStoreProducts(): Promise<any[]> {
  return await readJsonFile<any[]>("store-products.json", FALLBACK_PRODUCTS);
}

export async function saveStoreProducts(products: any[]): Promise<boolean> {
  return await writeJsonFile("store-products.json", products);
}

