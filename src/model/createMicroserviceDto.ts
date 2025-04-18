/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Swagger Provider Documentation
 * Сервис для объединения Swagger схем в одном месте
 * OpenAPI spec version: 1.0
 */
import type { CreateMicroserviceDtoType } from './createMicroserviceDtoType';

export interface CreateMicroserviceDto {
  name: string;
  type: CreateMicroserviceDtoType;
  content: string;
  projectId: string;
  /** Должна ли обновляться схема при её получении */
  isUpdateByGetScheme: boolean;
}
