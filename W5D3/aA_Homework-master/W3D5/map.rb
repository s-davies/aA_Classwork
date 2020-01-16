class Map
    def initialize
        @my_map = []
    end

    def set(key, value)
        if @my_map.any? {|arr| arr.first == key}
            @my_map.each_with_index do |arr,idx|
                @my_map[idx][1] = value if arr.first == key
            end
        else
            @my_map << [key,value]
        end
    end

    def get(key)
        @my_map.each do |arr|
            return arr.last if arr.first == key
        end
        nil
    end

    def delete(key)
        @my_map.reject! do |arr|
            arr.first == key
        end
    end

    def show
        @my_map
    end
end