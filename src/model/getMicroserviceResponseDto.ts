/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Swagger Provider Documentation
 * Сервис для объединения Swagger схем в одном месте
 * OpenAPI spec version: 1.0
 */
import type { GetMicroserviceResponseDtoType } from './getMicroserviceResponseDtoType';

export interface GetMicroserviceResponseDto {
  id: string;
  name: string;
  type: GetMicroserviceResponseDtoType;
  url: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  version: number;
  status: string;
  content: string;
}
