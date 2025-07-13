import { supabase } from "@/integrations/supabase/client";

export interface WorldDestination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  image_url: string;
  rating: number;
  price_range: 'Budget' | 'Mid-range' | 'Luxury';
  best_time_to_visit: string[];
  attractions: string[];
  cuisine: string[];
  activities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  climate: string;
  languages: string[];
  currency: string;
  timezone: string;
  safety_level: 'Low' | 'Medium' | 'High';
  visa_required: boolean;
  avg_temperature: {
    summer: number;
    winter: number;
  };
  created_at: string;
  updated_at: string;
}

export interface TravelTip {
  id: string;
  destination_name: string;
  category: 'Transportation' | 'Accommodation' | 'Food' | 'Culture' | 'Safety' | 'Budget';
  title: string;
  content: string;
  importance: 'Low' | 'Medium' | 'High';
  created_at: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  destination_id: string;
  created_at: string;
}

export interface UserVisitedDestination {
  id: string;
  user_id: string;
  destination_id: string;
  visit_date: string;
  rating: number;
  notes: string;
  created_at: string;
}

export class WorldDestinationsService {
  // Get all destinations
  static async getAllDestinations(): Promise<WorldDestination[]> {
    try {
      const { data, error } = await supabase
        .from('world_destinations')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  }

  // Get destination by ID
  static async getDestinationById(id: string): Promise<WorldDestination | null> {
    try {
      const { data, error } = await supabase
        .from('world_destinations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as any;
    } catch (error) {
      console.error('Error fetching destination:', error);
      throw error;
    }
  }

  // Search destinations
  static async searchDestinations(query: string): Promise<WorldDestination[]> {
    try {
      const { data, error } = await supabase
        .rpc('search_destinations', { search_query: query });

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error searching destinations:', error);
      throw error;
    }
  }

  // Get destinations by continent
  static async getDestinationsByContinent(continent: string): Promise<WorldDestination[]> {
    try {
      const { data, error } = await supabase
        .rpc('get_destinations_by_continent', { continent_filter: continent });

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error fetching destinations by continent:', error);
      throw error;
    }
  }

  // Get destinations by budget
  static async getDestinationsByBudget(budget: string): Promise<WorldDestination[]> {
    try {
      const { data, error } = await supabase
        .rpc('get_destinations_by_budget', { budget_filter: budget });

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error fetching destinations by budget:', error);
      throw error;
    }
  }

  // Get destinations by climate
  static async getDestinationsByClimate(climate: string): Promise<WorldDestination[]> {
    try {
      const { data, error } = await supabase
        .from('world_destinations')
        .select('*')
        .eq('climate', climate)
        .order('rating', { ascending: false });

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error fetching destinations by climate:', error);
      throw error;
    }
  }

  // Get destinations by rating
  static async getDestinationsByRating(minRating: number): Promise<WorldDestination[]> {
    try {
      const { data, error } = await supabase
        .from('world_destinations')
        .select('*')
        .gte('rating', minRating)
        .order('rating', { ascending: false });

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error fetching destinations by rating:', error);
      throw error;
    }
  }

  // Get random destinations
  static async getRandomDestinations(count: number): Promise<WorldDestination[]> {
    try {
      const { data, error } = await supabase
        .from('world_destinations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(count);

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error fetching random destinations:', error);
      throw error;
    }
  }

  // Get travel tips for a destination
  static async getTravelTips(destinationName: string): Promise<TravelTip[]> {
    try {
      const { data, error } = await supabase
        .from('travel_tips')
        .select('*')
        .eq('destination_name', destinationName)
        .order('importance', { ascending: false });

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error fetching travel tips:', error);
      throw error;
    }
  }

  // Get all travel tips
  static async getAllTravelTips(): Promise<TravelTip[]> {
    try {
      const { data, error } = await supabase
        .from('travel_tips')
        .select('*')
        .order('importance', { ascending: false });

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error fetching all travel tips:', error);
      throw error;
    }
  }

  // User favorites operations
  static async getUserFavorites(userId: string): Promise<WorldDestination[]> {
    try {
      const { data, error } = await supabase
        .rpc('get_user_favorites', { user_uuid: userId });

      if (error) throw error;
      return (data as any) || [];
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      throw error;
    }
  }

  static async addToFavorites(userId: string, destinationId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: userId,
          destination_id: destinationId
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  static async removeFromFavorites(userId: string, destinationId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('destination_id', destinationId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  static async isFavorite(userId: string, destinationId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('destination_id', destinationId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  // User visited destinations operations
  static async getUserVisitedDestinations(userId: string): Promise<UserVisitedDestination[]> {
    try {
      const { data, error } = await supabase
        .from('user_visited_destinations')
        .select('*')
        .eq('user_id', userId)
        .order('visit_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching visited destinations:', error);
      throw error;
    }
  }

  static async addVisitedDestination(
    userId: string, 
    destinationId: string, 
    visitDate: string, 
    rating: number, 
    notes?: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_visited_destinations')
        .insert({
          user_id: userId,
          destination_id: destinationId,
          visit_date: visitDate,
          rating,
          notes: notes || ''
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding visited destination:', error);
      throw error;
    }
  }

  static async updateVisitedDestination(
    id: string,
    visitDate: string,
    rating: number,
    notes?: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_visited_destinations')
        .update({
          visit_date: visitDate,
          rating,
          notes: notes || ''
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating visited destination:', error);
      throw error;
    }
  }

  static async deleteVisitedDestination(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_visited_destinations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting visited destination:', error);
      throw error;
    }
  }

  // Get continents list
  static async getContinents(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('world_destinations')
        .select('continent')
        .order('continent');

      if (error) throw error;
      return [...new Set(data?.map(d => d.continent) || [])];
    } catch (error) {
      console.error('Error fetching continents:', error);
      throw error;
    }
  }

  // Get climates list
  static async getClimates(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('world_destinations')
        .select('climate')
        .order('climate');

      if (error) throw error;
      return [...new Set(data?.map(d => d.climate) || [])];
    } catch (error) {
      console.error('Error fetching climates:', error);
      throw error;
    }
  }

  // Get price ranges list
  static async getPriceRanges(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('world_destinations')
        .select('price_range')
        .order('price_range');

      if (error) throw error;
      return [...new Set(data?.map(d => d.price_range) || [])];
    } catch (error) {
      console.error('Error fetching price ranges:', error);
      throw error;
    }
  }

  // Get statistics
  static async getStatistics() {
    try {
      const [
        { count: totalDestinations },
        { count: totalTips },
        continents
      ] = await Promise.all([
        supabase.from('world_destinations').select('*', { count: 'exact', head: true }),
        supabase.from('travel_tips').select('*', { count: 'exact', head: true }),
        this.getContinents()
      ]);

      return {
        totalDestinations: totalDestinations || 0,
        totalTips: totalTips || 0,
        totalContinents: continents.length,
        averageRating: 4.7 // This could be calculated from the database
      };
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }
} 