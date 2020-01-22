class AttrAccessorObject
  def self.my_attr_accessor(*names)
    # ...
    names.each do |name|
      define_method(name) do
        sym = "@#{name.to_s}".to_sym
        self.instance_variable_get(sym)
      end
      setter = "#{name.to_s}=".to_sym
      define_method(setter) do |val|
        sym = "@#{name.to_s}".to_sym
        self.instance_variable_set(sym, val)
      end

    end
  end
end
