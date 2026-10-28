/**
 * Authoritative TypeScript contracts matching FastAPI Pydantic v2 schemas.
 * Generated for SMPS Tech Lab Phase 3 Database & Shared Contracts.
 */

export interface Role {
  id: number;
  name: string;
  description?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  roles: Role[];
  created_at: string;
}

export type User = UserProfile;

export interface Batch {
  id: string;
  program_id: string;
  batch_code: string;
  start_date: string;
  end_date: string;
  mode: "OFFLINE_BENGALURU_VTU" | "HYBRID";
  location?: string;
  capacity: number;
  enrolled_count: number;
  price_inr: string; // Decimal serialized as string
  is_open: boolean;
}

export interface InternshipProgram {
  id: string;
  slug: string;
  title: string;
  domain: string;
  target_branches: string[];
  description: string;
  syllabus_json: Record<string, string>;
  eligibility_criteria: string;
  duration_weeks: number;
  is_active: boolean;
  batches: Batch[];
}

export interface Application {
  id: string;
  user_id: string;
  batch_id: string;
  college_name: string;
  usn: string;
  branch: string;
  semester: number;
  cgpa?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ENROLLED";
  applied_at: string;
  batch?: Batch;
}

export interface Enrollment {
  id: string;
  application_id: string;
  user_id: string;
  batch_id: string;
  enrollment_number: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  attendance_percent: string;
  certificate_issued: boolean;
  certificate_id?: string;
  created_at: string;
  batch?: Batch;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon_name?: string;
}

export interface SKU {
  id: string;
  product_id: string;
  sku_code: string;
  title: string;
  price_inr: string;
  hsn_code: string;
  tax_rate_percent: string;
  weight_kg?: string;
  quantity_available: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  brand_line: string;
  short_description: string;
  description: string;
  specifications_json: Record<string, any>;
  datasheet_url?: string;
  primary_image_url?: string;
  is_published: boolean;
  skus: SKU[];
  category?: Category;
}

export interface OrderItem {
  id: string;
  sku_id: string;
  quantity: number;
  unit_price_inr: string;
  tax_rate_percent: string;
  total_price_inr: string;
}

export interface Address {
  recipient_name: string;
  phone: string;
  street_line1: string;
  street_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: "CREATED" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  subtotal_inr: string;
  tax_inr: string;
  shipping_fee_inr: string;
  discount_inr: string;
  total_inr: string;
  shipping_address_json: Address;
  tracking_number?: string;
  carrier_name?: string;
  created_at: string;
  items: OrderItem[];
}

export interface PaymentStatus {
  id: string;
  reference_type: "ORDER" | "ENROLLMENT";
  reference_id: string;
  gateway: "RAZORPAY";
  gateway_order_id: string;
  gateway_payment_id?: string;
  amount_inr: string;
  currency: string;
  status: "INITIATED" | "SUCCESS" | "FAILED" | "REFUNDED";
  verified_at?: string;
  created_at: string;
}
